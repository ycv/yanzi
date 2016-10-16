SELECT 
	`shop_id`, 
	`company`, 
	`dq_shop`.`created_at`, 
	`open_status`, 
	`attentionID`, 
	case when `attentionID` is null then 0 else 1 end as `rankjxs`,
        case when `open_status` = 2 then 1 else 0  end as `open_status` 
FROM 
	`dq_shop` 
	Left join (
		select 
			`attentionID`, 
			`userID` 
		from 
			`dq_attention` 
		where 
			`dq_attention`.`userID` = 4
	) tab1 on tab1.`attentionID` = `dq_shop`.`shop_id` 
group by 
	`shop_id`, 
	`open_status`, 
	`rankjxs`, 
	`dq_shop`.`created_at` 
order by 
	`open_status` desc, 
	`rankjxs` desc, 
	`dq_shop`.`created_at` desc