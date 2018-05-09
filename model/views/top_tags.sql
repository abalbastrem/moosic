-- obtener leyenda_tags ordenados por popularidad basandose en tags

CREATE OR REPLACE VIEW top_tags AS select row_number() OVER (order by count(*) DESC) as position, id_leyenda_tag, leyenda_tags.nombre, count(*) as popularidad from tags join leyenda_tags on id_leyenda_tag = leyenda_tags.id group by id_leyenda_tag, leyenda_tags.nombre order by popularidad DESC;

