--
-- PostgreSQL database cluster dump
--

-- Started on 2025-08-14 13:01:25

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE zpro;
ALTER ROLE zpro WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Y68xffdGdbsQxEl4KRBV+g==$za76F3K2NjuSCRf3/jFbJsgkwodQSSA6t7cobKRpyhQ=:rf2vdgWGJ3qLGgsVnDgbNZUi/J7nPAkdzgiZeZRaIfw=';

--
-- User Configurations
--








-- Completed on 2025-08-14 13:01:26

--
-- PostgreSQL database cluster dump complete
--

