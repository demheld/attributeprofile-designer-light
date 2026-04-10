WITH usr AS (
    SELECT
        *
    FROM
        sys_attribute,
        sys_p_user
    WHERE
            p_user_id = 11350451/*?obj_id*/
        AND obj_id = p_user_id
        AND page_nr = 0
)
SELECT
    sys_object.obj_id,
    sys_objclass.super_img_colapsed,
    sys_objclass.objclass_name,
    ss.type/*, sys_object.classification ?attribList*/
FROM
    sys_object_tbl sys_object,
    sys_attribute,
    sys_objclass,
    sys_structure  ss,
    sys_patient,
    usr
WHERE
    ( sys_object.obj_id = sys_attribute.obj_id
      AND sys_object.obj_id = ss.lower
      AND sys_object.objclass_id = sys_objclass.objclass_id
      AND sys_objclass.objclass_id = 11007499 )
    AND EXISTS (
        SELECT
            *
        FROM
            sys_obj_status
        WHERE
                obj_id = sys_patient.patient_id
            AND status_id = 11008147
    )
    AND EXISTS (
        SELECT
            *
        FROM
            dual
        WHERE
            f_object_visible(sys_patient.patient_id) = 1
    )
    AND NOT EXISTS (
        SELECT
            *
        FROM
            sys_object_ref
        WHERE
                ref_obj_id = sys_patient.patient_id
            AND type = 'MY_PERSONAL_PATIENT'
    )
    AND sys_patient.patient_id = sys_object.obj_id
    AND ( sys_patient.patients_birth_date = usr.d1
          AND (
        CASE
            WHEN utl_match.edit_distance(sys_patient.patients_family_name, usr.t2) BETWEEN 0 AND 2 THEN
                1
            ELSE
                0
        END
        +
        CASE
            WHEN utl_match.edit_distance(sys_patient.patients_given_name, usr.t1) BETWEEN 0 AND 2 THEN
                1
            ELSE
                0
        END
        +
        CASE
            WHEN utl_match.edit_distance(sys_patient.patients_family_name, usr.t1) BETWEEN 0 AND 2 THEN
                1
            ELSE
                0
        END
        +
        CASE
            WHEN utl_match.edit_distance(sys_patient.patients_given_name, usr.t2) BETWEEN 0 AND 2 THEN
                1
            ELSE
                0
        END
        +
        CASE
            WHEN sys_patient.patients_address_zip_code = usr.t3 THEN
                1
            ELSE
                0
        END
        +
        CASE
            WHEN utl_match.edit_distance(sys_patient.email1, usr.email1) BETWEEN 0 AND 5 THEN
                1
            ELSE
                0
        END
        +
        CASE
            WHEN utl_match.edit_distance(substr(sys_patient.phone1, - 7),
                                         substr(usr.mobile1, - 7)) BETWEEN 0 AND 1 THEN
                1
            ELSE
                0
        END
    ) >= 2 )