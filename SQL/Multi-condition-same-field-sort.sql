SELECT 
	`shop_id`, 
	`created_time`, 
	`version`,
         `attention`,
        case when `attention` is null 
        then 0
        else 1 end as `rank`
FROM 
	`test1` 
Left join 
(select `attention`,`userid` from `test2` where `userid` = 4 )tab1
on tab1.`attention` = `test1`.`shop_id` 
group by `version`,`rank`,`created_time` 
order by `version` desc,`rank` desc,`created_time` desc limit 0,5




-------------------------------------------------------------------------------------------

SELECT 
	`shop_id`, 
	`company`, 
	`dq_shop`.`created_at`, 
	`version`, 
	`attentionID`, 
	case when `attentionID` is null then 0 else 1 end as `rankjxs` 
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
	`version`, 
	`rankjxs`, 
	`dq_shop`.`created_at` 
order by 
	`version` desc, 
	`rankjxs` desc, 
	`dq_shop`.`created_at` desc 
limit 
	0, 
	110


-------------------------------------------------------------------------


SELECT 
	`shop_id`, 
	`company`, 
	`dq_shop`.`created_at`, 
	`version`, 
	`attentionID`, 
	case when `attentionID` is null then 0 else 1 end as `rankjxs` 
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
	`version`, 
	`rankjxs`, 
	`dq_shop`.`created_at` 
order by 
	`version` desc, 
	`rankjxs` desc, 
	`dq_shop`.`created_at` desc
-------------------------------------------------------------------------
