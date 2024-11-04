create table lines (
    id serial primary key,
    title varchar(255),
    created_at bigint default (extract(epoch from now()) * 1000)::bigint,
    updated_at bigint default (extract(epoch from now()) * 1000)::bigint
);

create table categories (
    id serial primary key,
    line_id int not null,
    title varchar(255),
    created_at bigint default (extract(epoch from now()) * 1000)::bigint,
    updated_at bigint default (extract(epoch from now()) * 1000)::bigint,

    foreign key (line_id) references lines (id)
);

create table questions (
    id serial primary key,
    category_id int not null,
    text text,
    created_at bigint default (extract(epoch from now()) * 1000)::bigint,
    updated_at bigint default (extract(epoch from now()) * 1000)::bigint,

    foreign key (category_id) references categories (id)
);
