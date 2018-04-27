create or replace function demo(integer) returns integer as $$
declare
resultado integer;
begin
select into strict resultado $1*2;
return resultado;
end;
$$language plpgsql;