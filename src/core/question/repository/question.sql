/* @name findQuestionsByCategoryId */
select q.id, q.category_id, q.text from questions q
where q.category_id = :categoryId
limit :limit offset :offset;

/*
    @name findRandomQuestionsByCategories
    @param categoryIds -> (...)
*/
with random_questions as (
    select
        q.id,
        q.category_id,
        q.text,
        row_number() over (partition by q.category_id order by random()) as rn
    from questions q
    join categories c on q.category_id = c.id
    where c.line_id = :lineId and c.id in :categoryIds
)
select
    rq.id,
    rq.category_id,
    rq.text
from random_questions rq
where rq.rn <= 10
order by rq.category_id, rq.rn;
