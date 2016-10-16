--1、查询“001”课程比“002”课程成绩高的所有学生的学号；
Select 
	StuId 
From 
	tblStudent s1 
Where 
	(
		Select 
			Score 
		From 
			tblScore t1 
		Where 
			t1.StuId = s1.stuId 
			And t1.CourseId = '001'
	)> (
		Select 
			Score 
		From 
			tblScore t2 
		Where 
			t2.StuId = s1.stuId 
			And t2.CourseId = '002'
	)
--2、查询平均成绩大于60分的同学的学号和平均成绩；   avg
Select 
	StuId, 
	Avg(Score) as AvgScore 
From 
	tblScore 
Group By 
	StuId 
Having 
	Avg(Score)> 60
--3、查询所有同学的学号、姓名、选课数、总成绩； 
Select 
	StuId, 
	StuName, 
	(
		Select 
			Count(CourseId) 
		From 
			tblScore t1 
		Where 
			t1.StuId = s1.StuId
	) as SelCourses, 
	(
		Select 
			Sum(Score) 
		From 
			tblScore t2 
		Where 
			t2.StuId = s1.StuId
	) as SumScore 
From 
	tblStudent s1
--4、查询姓“李”的老师的个数； 
Select 
	Count(*) 
From 
	tblTeacher 
Where 
	TeaName like '李%'
--5、查询没学过“叶平”老师课的同学的学号、姓名； 
Select 
	StuId, 
	StuName 
From 
	tblStudent 
Where 
	StuId Not In (
		Select 
			StuID 
		From 
			tblScore sc 
			Inner Join tblCourse cu ON sc.CourseId = cu.CourseId 
			Inner Join tblTeacher tc ON cu.TeaId = tc.TeaId 
		Where 
			tc.TeaName = '叶平'
	)

--6、查询学过“001”并且也学过编号“002”课程的同学的学号、姓名； 
Select 
	StuId, 
	StuName 
From 
	tblStudent st 
Where 
	(
		Select 
			Count(*) 
		From 
			tblScore s1 
		Where 
			s1.StuId = st.StuId 
			And s1.CourseId = '001'
	)> 0 
	And (
		Select 
			Count(*) 
		From 
			tblScore s2 
		Where 
			s2.StuId = st.StuId 
			And s2.CourseId = '002'
	)> 0
















