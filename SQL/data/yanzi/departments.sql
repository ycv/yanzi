--
-- 数据库: `yanzi`
--

-- --------------------------------------------------------

--
-- 表的结构 `departments`
--

CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` varchar(40) COLLATE utf8_unicode_ci NOT NULL COMMENT '部门编号',
  `dept_name` varchar(40) COLLATE utf8_unicode_ci NOT NULL COMMENT '部门名称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='yanzi 部门表 2016-10-28' AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `departments`
--
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (1, 'd001', 'Marketing');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (2, 'd002', 'Finance');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (3, 'd003', 'Human Resources');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (4, 'd004', 'Production');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (5, 'd005', 'Development');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (6, 'd006', 'Quality Management');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (7, 'd007', 'Sales');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (8, 'd008', 'Research');
INSERT INTO `departments` (`id`, `dept_id`, `dept_name`) VALUES (9, 'd009', 'Customer Service');
