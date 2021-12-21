create pluggable database production
    admin user adm identified by 11
    roles = (dba)
    default tablespace rent_ts
    datafile '/u02/app/oracle/oradata/production/datafile.dbf' size 700m autoextend on
    path_prefix='/u02/app/oracle/oradata/production/'
    file_name_convert = (
        '/u02/app/oracle/oradata/ORCL/pdbseed/',
        '/u02/app/oracle/oradata/ORCL/production/'
    );
