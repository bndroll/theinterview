/* @name findLines */
select l.id, l.title, count(c.*) as categories_count, count(q.*) as questions_count from lines l
left join categories c on c.line_id = l.id
left join questions q on q.category_id = c.id
group by l.id, l.title;
