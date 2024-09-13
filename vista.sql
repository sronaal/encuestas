CREATE VIEW RespuestasVista AS 
SELECT
    `Respuestas`.`id` AS `id`,
    `Respuestas`.`CallerID` AS `CallerID`,
    `Respuestas`.`Fecha` AS `Fecha`,
    `Respuestas`.`Hora` AS `Hora`,
    `Respuestas`.`Respuesta1` AS `Respuesta1`,
    `Respuestas`.`Respuesta2` AS `Respuesta2`,
    `Respuestas`.`Respuesta3` AS `Respuesta3`,
    `Respuestas`.`Respuesta4` AS `Respuesta4`,
    `Respuestas`.`Respuesta5` AS `Respuesta5`,

    '¿El funcionario resolvió su problema o respondió a su pregunta de manera satisfactoria?' as `Pregunta1`,
    CASE
        WHEN `Respuestas`.`Respuesta1` = 1 THEN 'Totalmente Insatisfecho'
        WHEN `Respuestas`.`Respuesta1` = 2 THEN 'Insatisfecho'
        WHEN `Respuestas`.`Respuesta1` = 3 THEN 'Neutral'
        WHEN `Respuestas`.`Respuesta1` = 4 THEN 'Satisfecho'
        WHEN `Respuestas`.`Respuesta1` = 5 THEN 'Totalmente Satisfecho'
        ELSE 'No Respondido'
    END AS `TextoRespuesta1`,

    '¿Cuál es su nivel de satisfacción con la amabilidad del funcionario que lo atendió?' as `Pregunta2`,
    CASE
        WHEN `Respuestas`.`Respuesta2` = 1 THEN 'Totalmente Insatisfecho'
        WHEN `Respuestas`.`Respuesta2` = 2 THEN 'Insatisfecho'
        WHEN `Respuestas`.`Respuesta2` = 3 THEN 'Neutral'
        WHEN `Respuestas`.`Respuesta2` = 4 THEN 'Satisfecho'
        WHEN `Respuestas`.`Respuesta2` = 5 THEN 'Totalmente Satisfecho'
        ELSE 'No Respondido'
    END AS `TextoRespuesta2`,

    'En general, ¿cómo calificaría su experiencia con nuestro servicio de atención al cliente hoy?' as `Pregunta3`,
    CASE
        WHEN `Respuestas`.`Respuesta3` = 1 THEN 'Totalmente Insatisfecho'
        WHEN `Respuestas`.`Respuesta3` = 2 THEN 'Insatisfecho'
        WHEN `Respuestas`.`Respuesta3` = 3 THEN 'Neutral'
        WHEN `Respuestas`.`Respuesta3` = 4 THEN 'Satisfecho'
        WHEN `Respuestas`.`Respuesta3` = 5 THEN 'Totalmente Satisfecho'
        ELSE 'No Respondido'
    END AS `TextoRespuesta3`,
    
    CASE
        WHEN `Respuestas`.`Respuesta4` = 1 THEN 'Totalmente Insatisfecho'
        WHEN `Respuestas`.`Respuesta4` = 2 THEN 'Insatisfecho'
        WHEN `Respuestas`.`Respuesta4` = 3 THEN 'Neutral'
        WHEN `Respuestas`.`Respuesta4` = 4 THEN 'Satisfecho'
        WHEN `Respuestas`.`Respuesta4` = 5 THEN 'Totalmente Satisfecho'
        ELSE 'No Respondido'
    END AS `TextoRespuesta4`,
    
    CASE
        WHEN `Respuestas`.`Respuesta5` = 1 THEN 'Totalmente Insatisfecho'
        WHEN `Respuestas`.`Respuesta5` = 2 THEN 'Insatisfecho'
        WHEN `Respuestas`.`Respuesta5` = 3 THEN 'Neutral'
        WHEN `Respuestas`.`Respuesta5` = 4 THEN 'Satisfecho'
        WHEN `Respuestas`.`Respuesta5` = 5 THEN 'Totalmente Satisfecho'
        ELSE 'No Respondido'
    END AS `TextoRespuesta5`
    
FROM
    `Respuestas`
INNER JOIN 
    `asterisk`.`users` ON `Respuestas`.`extension` = `users`.`extension`;
