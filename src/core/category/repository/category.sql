/* @name findCategoriesByLineId */
select c.id, c.line_id, c.title, count(q.*) as questions_count from categories c
left join questions q on q.category_id = c.id
where c.line_id = :lineId
group by c.id, c.line_id, c.title;
