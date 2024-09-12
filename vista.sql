CREATE VIEW AS 

select
    `Respuestas`.`id` AS `id`,
    `Respuestas`.`CallerID` AS `CallerID`,
    `Respuestas`.`Fecha` AS `Fecha`,
    `Respuestas`.`Hora` AS `Hora`,
    `Respuestas`.`Respuesta1` AS `Respuesta1`,
    `Respuestas`.`Respuesta2` AS `Respuesta2`,
    `Respuestas`.`Respuesta3` AS `Respuesta3`,
    `Respuestas`.`Respuesta4` AS `Respuesta4`,
    `Respuestas`.`Respuesta5` AS `Respuesta5`


    CASE
        WHEN `Respuestas`.`Respuesta1` = 1 then 'Totalmente Insatisfecho'
        WHEN `Respuestas`.`Respuesta2` = 1 then 'Totalmente Insatisfecho'

from
    `Respuestas`;