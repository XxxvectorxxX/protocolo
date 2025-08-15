--
-- PostgreSQL database dump
--

\restrict L8QcyYEmTXGurv5SiLYveE1Iu5daE1yk8WFUKZ5cgagvBH4Fh6ndEyUjY1HawNe

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_BackupResults_backupType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_BackupResults_backupType" AS ENUM (
    'manual',
    'scheduled',
    'api'
);


ALTER TYPE public."enum_BackupResults_backupType" OWNER TO postgres;

--
-- Name: enum_PipelineActionLogs_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_PipelineActionLogs_status" AS ENUM (
    'success',
    'error',
    'pending'
);


ALTER TYPE public."enum_PipelineActionLogs_status" OWNER TO postgres;

--
-- Name: enum_PipelineActions_actionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_PipelineActions_actionType" AS ENUM (
    'message',
    'stage_change',
    'status_change',
    'add_tag',
    'add_wallet',
    'flow'
);


ALTER TYPE public."enum_PipelineActions_actionType" OWNER TO postgres;

--
-- Name: enum_Users_sipStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_sipStatus" AS ENUM (
    'online',
    'offline',
    'busy'
);


ALTER TYPE public."enum_Users_sipStatus" OWNER TO postgres;

--
-- Name: enum_Users_sipTransport; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_sipTransport" AS ENUM (
    'udp',
    'tcp',
    'tls',
    'ws'
);


ALTER TYPE public."enum_Users_sipTransport" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ApiConfigs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ApiConfigs" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "sessionId" integer,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    token character varying(255) DEFAULT NULL::character varying,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "urlServiceStatus" text,
    "urlMessageStatus" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "authToken" text
);


ALTER TABLE public."ApiConfigs" OWNER TO postgres;

--
-- Name: ApiMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ApiMessages" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "messageId" character varying(255) DEFAULT NULL::character varying,
    "externalKey" character varying(255) DEFAULT NULL::character varying,
    body text NOT NULL,
    ack integer DEFAULT 0 NOT NULL,
    number character varying(255) NOT NULL,
    "mediaName" text,
    "timestamp" integer,
    "sessionId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "messageWA" jsonb,
    "apiConfig" jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "mediaUrl" text
);


ALTER TABLE public."ApiMessages" OWNER TO postgres;

--
-- Name: AutoReply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AutoReply" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    action integer DEFAULT 0 NOT NULL,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "celularTeste" character varying(255) DEFAULT NULL::character varying,
    "tenantId" integer DEFAULT 1 NOT NULL
);


ALTER TABLE public."AutoReply" OWNER TO postgres;

--
-- Name: AutoReplyLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AutoReplyLogs" (
    id integer NOT NULL,
    "autoReplyId" integer NOT NULL,
    "autoReplyName" character varying(255) NOT NULL,
    "stepsReplyId" integer NOT NULL,
    "stepsReplyMessage" character varying(255) NOT NULL,
    "wordsReply" character varying(255) NOT NULL,
    "contactId" integer,
    "ticketId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AutoReplyLogs" OWNER TO postgres;

--
-- Name: AutoReplyLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AutoReplyLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AutoReplyLogs_id_seq" OWNER TO postgres;

--
-- Name: AutoReplyLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AutoReplyLogs_id_seq" OWNED BY public."AutoReplyLogs".id;


--
-- Name: AutoReply_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AutoReply_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AutoReply_id_seq" OWNER TO postgres;

--
-- Name: AutoReply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AutoReply_id_seq" OWNED BY public."AutoReply".id;


--
-- Name: BackupConfigs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BackupConfigs" (
    id integer NOT NULL,
    "storageType" character varying(255) NOT NULL,
    "localPath" text,
    "s3Bucket" character varying(255),
    "s3Region" character varying(255),
    "s3AccessKeyId" character varying(255),
    "s3SecretAccessKey" character varying(255),
    "ftpHost" character varying(255),
    "ftpPort" integer,
    "ftpUsername" character varying(255),
    "ftpPassword" character varying(255),
    "ftpPath" character varying(255),
    "sftpHost" character varying(255),
    "sftpPort" integer,
    "sftpUsername" character varying(255),
    "sftpPassword" character varying(255),
    "sftpPrivateKey" text,
    "sftpPath" character varying(255),
    compression boolean DEFAULT true NOT NULL,
    encryption boolean DEFAULT false NOT NULL,
    "encryptionPassword" character varying(255),
    "retentionDays" integer DEFAULT 30 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    description text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "tenantId" integer NOT NULL
);


ALTER TABLE public."BackupConfigs" OWNER TO postgres;

--
-- Name: BackupConfigs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BackupConfigs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BackupConfigs_id_seq" OWNER TO postgres;

--
-- Name: BackupConfigs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BackupConfigs_id_seq" OWNED BY public."BackupConfigs".id;


--
-- Name: BackupResults; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BackupResults" (
    id integer NOT NULL,
    "tenantId" integer NOT NULL,
    "tenantName" character varying(255) NOT NULL,
    "backupType" public."enum_BackupResults_backupType" DEFAULT 'api'::public."enum_BackupResults_backupType" NOT NULL,
    "databaseSuccess" boolean DEFAULT false NOT NULL,
    "filesSuccess" boolean DEFAULT false NOT NULL,
    "databaseSize" bigint,
    "filesSize" bigint,
    "totalSize" bigint,
    "databaseError" text,
    "filesError" text,
    "backupPath" character varying(255),
    duration integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BackupResults" OWNER TO postgres;

--
-- Name: COLUMN "BackupResults"."tenantId"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."tenantId" IS 'ID do tenant';


--
-- Name: COLUMN "BackupResults"."tenantName"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."tenantName" IS 'Nome do tenant';


--
-- Name: COLUMN "BackupResults"."backupType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."backupType" IS 'Tipo de backup (manual, agendado, via API)';


--
-- Name: COLUMN "BackupResults"."databaseSuccess"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."databaseSuccess" IS 'Sucesso do backup do banco de dados';


--
-- Name: COLUMN "BackupResults"."filesSuccess"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."filesSuccess" IS 'Sucesso do backup dos arquivos';


--
-- Name: COLUMN "BackupResults"."databaseSize"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."databaseSize" IS 'Tamanho do backup do banco em bytes';


--
-- Name: COLUMN "BackupResults"."filesSize"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."filesSize" IS 'Tamanho do backup dos arquivos em bytes';


--
-- Name: COLUMN "BackupResults"."totalSize"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."totalSize" IS 'Tamanho total do backup em bytes';


--
-- Name: COLUMN "BackupResults"."databaseError"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."databaseError" IS 'Erro do backup do banco de dados';


--
-- Name: COLUMN "BackupResults"."filesError"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."filesError" IS 'Erro do backup dos arquivos';


--
-- Name: COLUMN "BackupResults"."backupPath"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults"."backupPath" IS 'Caminho onde o backup foi salvo';


--
-- Name: COLUMN "BackupResults".duration; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."BackupResults".duration IS 'Duração do backup em segundos';


--
-- Name: BackupResults_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BackupResults_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BackupResults_id_seq" OWNER TO postgres;

--
-- Name: BackupResults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BackupResults_id_seq" OWNED BY public."BackupResults".id;


--
-- Name: Baileys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Baileys" (
    id integer NOT NULL,
    "whatsappId" integer NOT NULL,
    contacts jsonb,
    chats jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Baileys" OWNER TO postgres;

--
-- Name: BaileysSessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BaileysSessions" (
    id integer NOT NULL,
    "whatsappId" integer NOT NULL,
    value json,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BaileysSessions" OWNER TO postgres;

--
-- Name: BaileysSessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BaileysSessions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BaileysSessions_id_seq" OWNER TO postgres;

--
-- Name: BaileysSessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BaileysSessions_id_seq" OWNED BY public."BaileysSessions".id;


--
-- Name: Baileys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Baileys_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Baileys_id_seq" OWNER TO postgres;

--
-- Name: Baileys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Baileys_id_seq" OWNED BY public."Baileys".id;


--
-- Name: BanLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BanLists" (
    id integer NOT NULL,
    "groupId" character varying(255) NOT NULL,
    number text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."BanLists" OWNER TO postgres;

--
-- Name: BanLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BanLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BanLists_id_seq" OWNER TO postgres;

--
-- Name: BanLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BanLists_id_seq" OWNED BY public."BanLists".id;


--
-- Name: BirthdayMessagesSents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BirthdayMessagesSents" (
    id integer NOT NULL,
    "contactId" integer NOT NULL,
    "whatsappId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    "sentAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BirthdayMessagesSents" OWNER TO postgres;

--
-- Name: BirthdayMessagesSents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BirthdayMessagesSents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BirthdayMessagesSents_id_seq" OWNER TO postgres;

--
-- Name: BirthdayMessagesSents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BirthdayMessagesSents_id_seq" OWNED BY public."BirthdayMessagesSents".id;


--
-- Name: CallLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CallLogs" (
    id integer NOT NULL,
    "phoneNumber" character varying(255) NOT NULL,
    "callStatus" character varying(255) NOT NULL,
    "callDuration" integer,
    "originNumber" character varying(255) NOT NULL,
    "destinationNumber" character varying(255) NOT NULL,
    "userId" integer,
    "tenantId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CallLogs" OWNER TO postgres;

--
-- Name: CallLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CallLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CallLogs_id_seq" OWNER TO postgres;

--
-- Name: CallLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CallLogs_id_seq" OWNED BY public."CallLogs".id;


--
-- Name: CampaignContacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CampaignContacts" (
    id integer NOT NULL,
    "messageRandom" character varying(255) NOT NULL,
    body text,
    "mediaName" character varying(255) DEFAULT NULL::character varying,
    "messageId" character varying(255) DEFAULT NULL::character varying,
    "jobId" character varying(255) DEFAULT NULL::character varying,
    ack integer DEFAULT 0 NOT NULL,
    "timestamp" integer,
    "contactId" integer,
    "campaignId" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CampaignContacts" OWNER TO postgres;

--
-- Name: CampaignContacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CampaignContacts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CampaignContacts_id_seq" OWNER TO postgres;

--
-- Name: CampaignContacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CampaignContacts_id_seq" OWNED BY public."CampaignContacts".id;


--
-- Name: Campaigns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Campaigns" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    start timestamp with time zone NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    "sessionId" integer,
    message1 text NOT NULL,
    message2 text NOT NULL,
    message3 text NOT NULL,
    "mediaUrl" character varying(255) DEFAULT NULL::character varying,
    "mediaType" character varying(255) DEFAULT NULL::character varying,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    delay integer DEFAULT 20 NOT NULL
);


ALTER TABLE public."Campaigns" OWNER TO postgres;

--
-- Name: Campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Campaigns_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Campaigns_id_seq" OWNER TO postgres;

--
-- Name: Campaigns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Campaigns_id_seq" OWNED BY public."Campaigns".id;


--
-- Name: ChatFlow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ChatFlow" (
    id integer NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    flow json DEFAULT '{}'::json NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "celularTeste" character varying(255) DEFAULT NULL::character varying,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "isDeleted" boolean DEFAULT false
);


ALTER TABLE public."ChatFlow" OWNER TO postgres;

--
-- Name: ChatFlow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ChatFlow_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ChatFlow_id_seq" OWNER TO postgres;

--
-- Name: ChatFlow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ChatFlow_id_seq" OWNED BY public."ChatFlow".id;


--
-- Name: ContactCustomFields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactCustomFields" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    "contactId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ContactCustomFields" OWNER TO postgres;

--
-- Name: ContactCustomFields_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactCustomFields_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactCustomFields_id_seq" OWNER TO postgres;

--
-- Name: ContactCustomFields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactCustomFields_id_seq" OWNED BY public."ContactCustomFields".id;


--
-- Name: ContactTags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactTags" (
    id integer NOT NULL,
    "tagId" integer NOT NULL,
    "contactId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ContactTags" OWNER TO postgres;

--
-- Name: ContactTags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactTags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactTags_id_seq" OWNER TO postgres;

--
-- Name: ContactTags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactTags_id_seq" OWNED BY public."ContactTags".id;


--
-- Name: ContactWallets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactWallets" (
    id integer NOT NULL,
    "walletId" integer NOT NULL,
    "contactId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ContactWallets" OWNER TO postgres;

--
-- Name: ContactWallets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ContactWallets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactWallets_id_seq" OWNER TO postgres;

--
-- Name: ContactWallets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ContactWallets_id_seq" OWNED BY public."ContactWallets".id;


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Contacts" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    number character varying(255) DEFAULT NULL::character varying,
    "profilePicUrl" text DEFAULT NULL::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    email character varying(255) DEFAULT NULL::character varying,
    "isGroup" boolean DEFAULT false NOT NULL,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "isWAContact" boolean,
    "isUser" boolean,
    pushname character varying(255) DEFAULT NULL::character varying,
    "telegramId" bigint,
    "instagramPK" bigint,
    "messengerId" text,
    kanban integer,
    blocked boolean DEFAULT false,
    "birthdayDate" character varying(255) DEFAULT NULL::character varying,
    cpf character varying(255) DEFAULT NULL::character varying,
    "firstName" character varying(255) DEFAULT NULL::character varying,
    "businessName" character varying(255) DEFAULT NULL::character varying,
    "lastName" character varying(255) DEFAULT NULL::character varying,
    "hubWhatsapp" text,
    "hubTelegram" text,
    "hubWidget" text,
    "hubWebchat" text,
    "hubEmail" text,
    "hubSms" text,
    "hubMercadolivre" text,
    "hubTiktok" text,
    "hubLikedin" text,
    "hubIfood" text,
    "hubTwitter" text,
    "hubOlx" text,
    "hubYoutube" text,
    "chatbotBlocked" boolean DEFAULT false,
    "webchatId" text,
    lid character varying(255)
);


ALTER TABLE public."Contacts" OWNER TO postgres;

--
-- Name: Contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Contacts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Contacts_id_seq" OWNER TO postgres;

--
-- Name: Contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Contacts_id_seq" OWNED BY public."Contacts".id;


--
-- Name: FarewellMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FarewellMessages" (
    id integer NOT NULL,
    "groupId" character varying(255) NOT NULL,
    message text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FarewellMessages" OWNER TO postgres;

--
-- Name: FarewellMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FarewellMessages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FarewellMessages_id_seq" OWNER TO postgres;

--
-- Name: FarewellMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FarewellMessages_id_seq" OWNED BY public."FarewellMessages".id;


--
-- Name: FarewellPrivateMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FarewellPrivateMessages" (
    id integer NOT NULL,
    message text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."FarewellPrivateMessages" OWNER TO postgres;

--
-- Name: FarewellPrivateMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FarewellPrivateMessages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FarewellPrivateMessages_id_seq" OWNER TO postgres;

--
-- Name: FarewellPrivateMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FarewellPrivateMessages_id_seq" OWNED BY public."FarewellPrivateMessages".id;


--
-- Name: FastReply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FastReply" (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    message text NOT NULL,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    media text,
    voice text
);


ALTER TABLE public."FastReply" OWNER TO postgres;

--
-- Name: FastReply_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FastReply_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FastReply_id_seq" OWNER TO postgres;

--
-- Name: FastReply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FastReply_id_seq" OWNED BY public."FastReply".id;


--
-- Name: GhostLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GhostLists" (
    id integer NOT NULL,
    shortcut text NOT NULL,
    message text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GhostLists" OWNER TO postgres;

--
-- Name: GhostLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GhostLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GhostLists_id_seq" OWNER TO postgres;

--
-- Name: GhostLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GhostLists_id_seq" OWNED BY public."GhostLists".id;


--
-- Name: GoogleCalendars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GoogleCalendars" (
    id integer NOT NULL,
    "tenantId" integer NOT NULL,
    "googleClientId" character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "googleClientSecret" text NOT NULL,
    "googleAccessToken" text,
    "googleRefreshToken" text,
    "tokenExpiresAt" timestamp with time zone,
    "isActive" boolean DEFAULT false NOT NULL,
    notes text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GoogleCalendars" OWNER TO postgres;

--
-- Name: COLUMN "GoogleCalendars"."tenantId"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."tenantId" IS 'ID do tenant';


--
-- Name: COLUMN "GoogleCalendars"."googleClientId"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."googleClientId" IS 'Google Client ID';


--
-- Name: COLUMN "GoogleCalendars".name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars".name IS 'Nome da configuração/agenda';


--
-- Name: COLUMN "GoogleCalendars"."googleClientSecret"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."googleClientSecret" IS 'Google Client Secret';


--
-- Name: COLUMN "GoogleCalendars"."googleAccessToken"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."googleAccessToken" IS 'Google Access Token';


--
-- Name: COLUMN "GoogleCalendars"."googleRefreshToken"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."googleRefreshToken" IS 'Google Refresh Token';


--
-- Name: COLUMN "GoogleCalendars"."tokenExpiresAt"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."tokenExpiresAt" IS 'Data de expiração do Access Token';


--
-- Name: COLUMN "GoogleCalendars"."isActive"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars"."isActive" IS 'Se as credenciais estão ativas';


--
-- Name: COLUMN "GoogleCalendars".notes; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."GoogleCalendars".notes IS 'Observações sobre a configuração';


--
-- Name: GoogleCalendars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GoogleCalendars_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GoogleCalendars_id_seq" OWNER TO postgres;

--
-- Name: GoogleCalendars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GoogleCalendars_id_seq" OWNED BY public."GoogleCalendars".id;


--
-- Name: GreetingMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GreetingMessages" (
    id integer NOT NULL,
    "groupId" character varying(255) NOT NULL,
    message text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GreetingMessages" OWNER TO postgres;

--
-- Name: GreetingMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GreetingMessages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GreetingMessages_id_seq" OWNER TO postgres;

--
-- Name: GreetingMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GreetingMessages_id_seq" OWNED BY public."GreetingMessages".id;


--
-- Name: GroupLinkLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GroupLinkLists" (
    id integer NOT NULL,
    "groupId" character varying(255) NOT NULL,
    name text NOT NULL,
    link text NOT NULL,
    participants text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."GroupLinkLists" OWNER TO postgres;

--
-- Name: GroupLinkLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GroupLinkLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GroupLinkLists_id_seq" OWNER TO postgres;

--
-- Name: GroupLinkLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GroupLinkLists_id_seq" OWNED BY public."GroupLinkLists".id;


--
-- Name: GroupMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GroupMessages" (
    id integer NOT NULL,
    "group" character varying(255) NOT NULL,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."GroupMessages" OWNER TO postgres;

--
-- Name: GroupMessages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GroupMessages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GroupMessages_id_seq" OWNER TO postgres;

--
-- Name: GroupMessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GroupMessages_id_seq" OWNED BY public."GroupMessages".id;


--
-- Name: Kanbans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Kanbans" (
    id integer NOT NULL,
    name character varying(255) DEFAULT NULL::character varying,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "position" integer
);


ALTER TABLE public."Kanbans" OWNER TO postgres;

--
-- Name: Kanbans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Kanbans_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Kanbans_id_seq" OWNER TO postgres;

--
-- Name: Kanbans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Kanbans_id_seq" OWNED BY public."Kanbans".id;


--
-- Name: LicenseActivationLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LicenseActivationLogs" (
    id integer NOT NULL,
    "licenseCode" character varying(255) NOT NULL,
    "backendUrl" character varying(255) NOT NULL,
    status character varying(255),
    message character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."LicenseActivationLogs" OWNER TO postgres;

--
-- Name: LicenseActivationLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LicenseActivationLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LicenseActivationLogs_id_seq" OWNER TO postgres;

--
-- Name: LicenseActivationLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LicenseActivationLogs_id_seq" OWNED BY public."LicenseActivationLogs".id;


--
-- Name: LicenseRequestLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LicenseRequestLogs" (
    id integer NOT NULL,
    "licenseCode" character varying(255) NOT NULL,
    "responseData" jsonb NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."LicenseRequestLogs" OWNER TO postgres;

--
-- Name: LicenseRequestLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LicenseRequestLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LicenseRequestLogs_id_seq" OWNER TO postgres;

--
-- Name: LicenseRequestLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LicenseRequestLogs_id_seq" OWNED BY public."LicenseRequestLogs".id;


--
-- Name: Licenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Licenses" (
    id integer NOT NULL,
    license character varying(255) DEFAULT 'active'::character varying,
    "licenseData" jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Licenses" OWNER TO postgres;

--
-- Name: Licenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Licenses_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Licenses_id_seq" OWNER TO postgres;

--
-- Name: Licenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Licenses_id_seq" OWNED BY public."Licenses".id;


--
-- Name: LogTickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LogTickets" (
    id integer NOT NULL,
    "userId" integer,
    "ticketId" integer NOT NULL,
    "queueId" integer,
    type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "tenantId" integer
);


ALTER TABLE public."LogTickets" OWNER TO postgres;

--
-- Name: LogTickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LogTickets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LogTickets_id_seq" OWNER TO postgres;

--
-- Name: LogTickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LogTickets_id_seq" OWNED BY public."LogTickets".id;


--
-- Name: MessageUpserts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MessageUpserts" (
    id integer NOT NULL,
    body text,
    "mediaType" character varying(255),
    "mediaUrl" character varying(255),
    "ticketId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "tenantId" integer,
    "isEdited" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "isForwarded" boolean DEFAULT false NOT NULL,
    "remoteJid" character varying(255) NOT NULL,
    wid character varying(255),
    "dataJson" text NOT NULL,
    "whatsappId" integer,
    imported boolean DEFAULT false NOT NULL,
    ignore boolean DEFAULT false NOT NULL,
    "fromMe" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MessageUpserts" OWNER TO postgres;

--
-- Name: MessageUpserts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MessageUpserts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MessageUpserts_id_seq" OWNER TO postgres;

--
-- Name: MessageUpserts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MessageUpserts_id_seq" OWNED BY public."MessageUpserts".id;


--
-- Name: Messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Messages" (
    id character varying(255) NOT NULL,
    body text NOT NULL,
    ack integer DEFAULT 0 NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "mediaType" character varying(255),
    "mediaUrl" character varying(255),
    "ticketId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "fromMe" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "contactId" integer,
    "quotedMsgId" character varying(255),
    "timestamp" bigint,
    "userId" integer,
    "sendType" character varying(255) DEFAULT NULL::character varying,
    "messageId" character varying(255) DEFAULT NULL::character varying,
    "scheduleDate" timestamp with time zone,
    status character varying(255) DEFAULT NULL::character varying,
    "wabaMediaId" text,
    "tenantId" integer,
    "idFront" character varying(255) DEFAULT NULL::character varying,
    reaction text DEFAULT ''::text,
    "reactionFromMe" text DEFAULT ''::text,
    edition text DEFAULT ''::text,
    "syncTime" text DEFAULT ''::text,
    "isSticker" boolean DEFAULT false NOT NULL,
    "templateLanguage" text DEFAULT ''::text,
    "templateName" text DEFAULT ''::text,
    "remoteJid" character varying(255) DEFAULT ''::character varying,
    "isDelayed" boolean,
    "dataJson" text,
    "importedAt" timestamp with time zone
);


ALTER TABLE public."Messages" OWNER TO postgres;

--
-- Name: MessagesOffLine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MessagesOffLine" (
    id integer NOT NULL,
    body text NOT NULL,
    ack integer DEFAULT 0 NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "mediaType" character varying(255),
    "mediaUrl" character varying(255),
    "userId" integer,
    "ticketId" integer NOT NULL,
    "fromMe" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "contactId" integer,
    "quotedMsgId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."MessagesOffLine" OWNER TO postgres;

--
-- Name: MessagesOffLine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MessagesOffLine_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MessagesOffLine_id_seq" OWNER TO postgres;

--
-- Name: MessagesOffLine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MessagesOffLine_id_seq" OWNED BY public."MessagesOffLine".id;


--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    message text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- Name: Notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notifications_id_seq" OWNER TO postgres;

--
-- Name: Notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;


--
-- Name: Opportunitys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Opportunitys" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    value numeric(12,2) DEFAULT 0 NOT NULL,
    description text,
    "responsibleId" integer NOT NULL,
    "contactId" integer NOT NULL,
    "stageId" integer NOT NULL,
    "pipelineId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    "closingForecast" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    status character varying(255) DEFAULT 'open'::character varying NOT NULL
);


ALTER TABLE public."Opportunitys" OWNER TO postgres;

--
-- Name: Opportunitys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Opportunitys_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Opportunitys_id_seq" OWNER TO postgres;

--
-- Name: Opportunitys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Opportunitys_id_seq" OWNED BY public."Opportunitys".id;


--
-- Name: ParticipantsLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ParticipantsLists" (
    id integer NOT NULL,
    "groupId" character varying(255) NOT NULL,
    number text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ParticipantsLists" OWNER TO postgres;

--
-- Name: ParticipantsLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ParticipantsLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ParticipantsLists_id_seq" OWNER TO postgres;

--
-- Name: ParticipantsLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ParticipantsLists_id_seq" OWNED BY public."ParticipantsLists".id;


--
-- Name: PipelineActionLogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PipelineActionLogs" (
    id integer NOT NULL,
    "opportunityId" integer NOT NULL,
    "pipelineActionId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    status public."enum_PipelineActionLogs_status" DEFAULT 'pending'::public."enum_PipelineActionLogs_status" NOT NULL,
    "errorMessage" text,
    "executedAt" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "flowActionId" character varying(255)
);


ALTER TABLE public."PipelineActionLogs" OWNER TO postgres;

--
-- Name: PipelineActionLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PipelineActionLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PipelineActionLogs_id_seq" OWNER TO postgres;

--
-- Name: PipelineActionLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PipelineActionLogs_id_seq" OWNED BY public."PipelineActionLogs".id;


--
-- Name: PipelineActions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PipelineActions" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    "daysToTrigger" integer NOT NULL,
    "actionType" public."enum_PipelineActions_actionType" NOT NULL,
    "actionContent" text,
    "pipelineId" integer,
    "stageId" integer,
    "targetStageId" integer,
    "tagId" integer,
    "walletId" integer,
    "tenantId" integer,
    active boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "whatsappId" integer
);


ALTER TABLE public."PipelineActions" OWNER TO postgres;

--
-- Name: PipelineActions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PipelineActions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PipelineActions_id_seq" OWNER TO postgres;

--
-- Name: PipelineActions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PipelineActions_id_seq" OWNED BY public."PipelineActions".id;


--
-- Name: Pipelines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pipelines" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Pipelines" OWNER TO postgres;

--
-- Name: Pipelines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pipelines_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pipelines_id_seq" OWNER TO postgres;

--
-- Name: Pipelines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pipelines_id_seq" OWNED BY public."Pipelines".id;


--
-- Name: Plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Plans" (
    id integer NOT NULL,
    value numeric(10,2),
    connections integer,
    users integer,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    trial text,
    "trialPeriod" integer
);


ALTER TABLE public."Plans" OWNER TO postgres;

--
-- Name: Plans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Plans_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Plans_id_seq" OWNER TO postgres;

--
-- Name: Plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Plans_id_seq" OWNED BY public."Plans".id;


--
-- Name: PrivateMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PrivateMessage" (
    id bigint NOT NULL,
    text text NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "mediaType" character varying(255),
    "mediaUrl" character varying(255),
    "senderId" integer,
    "receiverId" integer,
    "groupId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "timestamp" bigint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."PrivateMessage" OWNER TO postgres;

--
-- Name: PrivateMessage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PrivateMessage_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PrivateMessage_id_seq" OWNER TO postgres;

--
-- Name: PrivateMessage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PrivateMessage_id_seq" OWNED BY public."PrivateMessage".id;


--
-- Name: Queues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Queues" (
    id integer NOT NULL,
    queue character varying(255) NOT NULL,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "tenantId" integer DEFAULT 1 NOT NULL
);


ALTER TABLE public."Queues" OWNER TO postgres;

--
-- Name: Queues_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Queues_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Queues_id_seq" OWNER TO postgres;

--
-- Name: Queues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Queues_id_seq" OWNED BY public."Queues".id;


--
-- Name: ReadPrivateMessageGroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReadPrivateMessageGroups" (
    id integer NOT NULL,
    "internalMessageId" bigint,
    "userGroupId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."ReadPrivateMessageGroups" OWNER TO postgres;

--
-- Name: ReadPrivateMessageGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ReadPrivateMessageGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ReadPrivateMessageGroups_id_seq" OWNER TO postgres;

--
-- Name: ReadPrivateMessageGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ReadPrivateMessageGroups_id_seq" OWNED BY public."ReadPrivateMessageGroups".id;


--
-- Name: Reasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reasons" (
    id integer NOT NULL,
    name character varying(255) DEFAULT NULL::character varying,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reasons" OWNER TO postgres;

--
-- Name: Reasons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reasons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reasons_id_seq" OWNER TO postgres;

--
-- Name: Reasons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reasons_id_seq" OWNED BY public."Reasons".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Settings" (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "tenantId" integer DEFAULT 1 NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Settings" OWNER TO postgres;

--
-- Name: Settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Settings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Settings_id_seq" OWNER TO postgres;

--
-- Name: Settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Settings_id_seq" OWNED BY public."Settings".id;


--
-- Name: Stages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Stages" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    color character varying(255) NOT NULL,
    "order" integer NOT NULL,
    "pipelineId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Stages" OWNER TO postgres;

--
-- Name: Stages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Stages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Stages_id_seq" OWNER TO postgres;

--
-- Name: Stages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Stages_id_seq" OWNED BY public."Stages".id;


--
-- Name: StepsReply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StepsReply" (
    id integer NOT NULL,
    reply character varying(255) NOT NULL,
    "idAutoReply" integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "initialStep" boolean DEFAULT false
);


ALTER TABLE public."StepsReply" OWNER TO postgres;

--
-- Name: StepsReplyActions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StepsReplyActions" (
    id integer NOT NULL,
    "stepReplyId" integer,
    words character varying(255) NOT NULL,
    action integer DEFAULT 0 NOT NULL,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "nextStepId" integer,
    "queueId" integer,
    "userIdDestination" integer,
    "replyDefinition" character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public."StepsReplyActions" OWNER TO postgres;

--
-- Name: StepsReplyActions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StepsReplyActions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StepsReplyActions_id_seq" OWNER TO postgres;

--
-- Name: StepsReplyActions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StepsReplyActions_id_seq" OWNED BY public."StepsReplyActions".id;


--
-- Name: StepsReply_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StepsReply_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StepsReply_id_seq" OWNER TO postgres;

--
-- Name: StepsReply_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StepsReply_id_seq" OWNED BY public."StepsReply".id;


--
-- Name: Tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tags" (
    id integer NOT NULL,
    tag character varying(255) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    color character varying(255) NOT NULL,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Tags" OWNER TO postgres;

--
-- Name: Tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tags_id_seq" OWNER TO postgres;

--
-- Name: Tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tags_id_seq" OWNED BY public."Tags".id;


--
-- Name: TenantApis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TenantApis" (
    id integer NOT NULL,
    "apiToken" text NOT NULL,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TenantApis" OWNER TO postgres;

--
-- Name: TenantApis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TenantApis_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TenantApis_id_seq" OWNER TO postgres;

--
-- Name: TenantApis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TenantApis_id_seq" OWNED BY public."TenantApis".id;


--
-- Name: Tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tenants" (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    "ownerId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(255) DEFAULT ''::character varying NOT NULL,
    "businessHours" jsonb DEFAULT '[{"day": 0, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "C", "label": "Domingo"}, {"day": 1, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Segunda-Feira"}, {"day": 2, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Terça-Feira"}, {"day": 3, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Quarta-Feira"}, {"day": 4, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Quinta-Feira"}, {"day": 5, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Sexta-Feira"}, {"day": 6, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "C", "label": "Sábado"}]'::jsonb,
    "messageBusinessHours" text DEFAULT 'Olá! Fantástico receber seu contato! No momento estamos ausentes e não poderemos lhe atender, mas vamos priorizar seu atendimento e retornaremos logo mais. Agradecemos muito o contato.'::text,
    "maxUsers" integer,
    "maxConnections" integer,
    "asaasToken" text,
    "asaasCustomerId" text,
    asaas text,
    "metaToken" text DEFAULT '733889dba67c72dd1bb43ea68e7b5e41c4a009c95d19b08f44d570e8f38374a8'::text,
    "bmToken" text DEFAULT ''::text,
    "webhookChecked" text DEFAULT ''::text,
    "showChatBot" text DEFAULT 'disabled'::text,
    "maxRetries" integer,
    "fixConnections" text DEFAULT 'disabled'::text,
    "forceAdmin" text DEFAULT 'disabled'::text,
    "smsToken" text DEFAULT ''::text,
    "acceptTerms" boolean DEFAULT false NOT NULL,
    rating jsonb DEFAULT '[{"label": "Ruim", "rating": 0}, {"label": "Regular", "rating": 1}, {"label": "Bom", "rating": 2}, {"label": "Muito Bom", "rating": 3}, {"label": "Excelente", "rating": 4}, {"label": "Incrível", "rating": 5}]'::jsonb,
    "nullTickets" text DEFAULT 'disabled'::text,
    identity text DEFAULT ''::text,
    trial text,
    "trialPeriod" integer,
    "systemColors" jsonb DEFAULT '[{"label": "Neutral", "neutral": "#E0E1E2"}, {"label": "Primary", "primary": "#5c67f2"}, {"label": "Secondary", "secondary": "#f5f5f9"}, {"label": "Accent", "accent": "#ff5c93"}, {"label": "Warning", "warning": "#ffeb3b"}, {"label": "Negative", "negative": "#f44336"}, {"label": "Positive", "positive": "#25d366"}, {"label": "Light", "light": "#8DB1DD"}]'::jsonb,
    "ticketLimit" integer,
    "forcePendingUser" text DEFAULT 'disabled'::text,
    "groupTickets" text DEFAULT 'disabled'::text,
    "hubToken" text,
    "noRedis" text DEFAULT 'enabled'::text,
    "wuzapiHost" text,
    "updateNames" text DEFAULT 'disabled'::text,
    "serviceTransfer" text DEFAULT 'enabled'::text,
    "tenantEmail" text,
    "tenantLicense" text,
    "hideUnoficial" boolean DEFAULT false NOT NULL,
    "privateMessageLimit" integer,
    "conectaSmsToken" text DEFAULT ''::text,
    "wavoipAuth" text,
    "supervisorAdmin" text DEFAULT 'disabled'::text,
    "evoHost" text,
    "evoToken" text,
    "walletExternalInteraction" text DEFAULT 'enabled'::text,
    "forceOpenChatWindow" text DEFAULT 'disabled'::text,
    "subscriptionData" text,
    "publicKeyVapid" text,
    "privateKeyVapid" text,
    "waitProcessExternalInteraction" text DEFAULT 'enabled'::text,
    "showClosedForAll" text DEFAULT 'disabled'::text,
    "showGroupsForAll" text DEFAULT 'disabled'::text,
    "audioPlugin" text DEFAULT 'disabled'::text,
    "ratingStore" text DEFAULT 'Sua avaliação foi armazenada com sucesso.'::text,
    "ratingStoreError" character varying(255) DEFAULT 'Não foi possível armazenar sua avaliação.'::character varying,
    "ratingStoreAttemp" character varying(255) DEFAULT 'Você tem mais uma oportunidade para avaliar esse atendimento enviando um número de 0 a 5. Se uma mensagem com valor diferente ao solicitado for enviada, a sua avaliação não será gravada.'::character varying,
    "ignoreIgStories" text DEFAULT 'disabled'::text,
    "baileysMediaPersist" text DEFAULT 'enabled'::text,
    "isUpdating" boolean DEFAULT false NOT NULL,
    "menuVisibility" jsonb DEFAULT '[{"grupo": true, "massa": true, "kanban": true, "equipes": true, "tarefas": true, "campanhas": true, "chat-flow": true, "relatorios": true, "api-service": true, "chat-privado": true}]'::jsonb,
    "audioModule" text DEFAULT 'disabled'::text,
    "groqCloud" character varying(255) DEFAULT 'disabled'::character varying,
    "groqCloudApiKey" character varying(255) DEFAULT NULL::character varying,
    "groqCloudLanguage" character varying(255) DEFAULT NULL::character varying,
    "groqCloudModel" character varying(255) DEFAULT NULL::character varying,
    "websocketToken" character varying(255),
    "controlFeatures" text DEFAULT 'disabled'::text,
    holidays jsonb DEFAULT '[]'::jsonb,
    "evaluationMessage" text,
    "forceReason" text DEFAULT 'disabled'::text,
    "listByLastMessage" text DEFAULT 'disabled'::text,
    "postmanLink" text,
    "allowPause" text DEFAULT 'disabled'::text,
    "useUserBusinessHours" text DEFAULT 'disabled'::text,
    "vapiToken" text,
    "forceLogout" text DEFAULT 'disabled'::text,
    masterkey text,
    "masterkeyEnabled" text DEFAULT 'disabled'::text,
    "masterkeyLog" text
);


ALTER TABLE public."Tenants" OWNER TO postgres;

--
-- Name: Tenants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tenants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tenants_id_seq" OWNER TO postgres;

--
-- Name: Tenants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tenants_id_seq" OWNED BY public."Tenants".id;


--
-- Name: TicketEvaluations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TicketEvaluations" (
    id integer NOT NULL,
    evaluation character varying(255) NOT NULL,
    attempts integer NOT NULL,
    "ticketId" integer NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TicketEvaluations" OWNER TO postgres;

--
-- Name: TicketEvaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TicketEvaluations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TicketEvaluations_id_seq" OWNER TO postgres;

--
-- Name: TicketEvaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TicketEvaluations_id_seq" OWNED BY public."TicketEvaluations".id;


--
-- Name: TicketNotes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TicketNotes" (
    id integer NOT NULL,
    notes text NOT NULL,
    "ticketId" integer NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "idFront" text DEFAULT ''::text
);


ALTER TABLE public."TicketNotes" OWNER TO postgres;

--
-- Name: TicketNotes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TicketNotes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TicketNotes_id_seq" OWNER TO postgres;

--
-- Name: TicketNotes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TicketNotes_id_seq" OWNED BY public."TicketNotes".id;


--
-- Name: TicketProtocols; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TicketProtocols" (
    id integer NOT NULL,
    protocol character varying(255) NOT NULL,
    "ticketId" integer NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."TicketProtocols" OWNER TO postgres;

--
-- Name: TicketProtocols_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TicketProtocols_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TicketProtocols_id_seq" OWNER TO postgres;

--
-- Name: TicketProtocols_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TicketProtocols_id_seq" OWNED BY public."TicketProtocols".id;


--
-- Name: TicketShareds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TicketShareds" (
    id integer NOT NULL,
    "inviteUrl" character varying(255) NOT NULL,
    "ticketId" integer NOT NULL,
    "userId" integer NOT NULL,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userIdArray" jsonb
);


ALTER TABLE public."TicketShareds" OWNER TO postgres;

--
-- Name: TicketShareds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TicketShareds_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TicketShareds_id_seq" OWNER TO postgres;

--
-- Name: TicketShareds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TicketShareds_id_seq" OWNED BY public."TicketShareds".id;


--
-- Name: Tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tickets" (
    id integer NOT NULL,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    "lastMessage" text,
    "contactId" integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "whatsappId" integer,
    "isGroup" boolean DEFAULT false NOT NULL,
    "autoReplyId" integer,
    "stepAutoReplyId" integer,
    "queueId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "unreadMessages" integer,
    answered boolean DEFAULT true,
    channel character varying(255) DEFAULT 'whatsapp'::character varying,
    "chatFlowId" integer,
    "stepChatFlow" character varying(255) DEFAULT NULL::character varying,
    "lastMessageAt" bigint,
    "startedAttendanceAt" bigint,
    "closedAt" bigint,
    "isActiveDemand" boolean DEFAULT false NOT NULL,
    "botRetries" integer DEFAULT 0 NOT NULL,
    "lastInteractionBot" timestamp with time zone,
    "apiConfig" jsonb,
    "isFarewellMessage" boolean DEFAULT false NOT NULL,
    "typebotStatus" boolean DEFAULT false NOT NULL,
    "typebotSessionId" character varying(255),
    "chatgptStatus" boolean DEFAULT false NOT NULL,
    "dialogflowStatus" boolean DEFAULT false NOT NULL,
    "chatGptHistory" jsonb,
    "threadId" text,
    "runId" text,
    "outOpenHoursTries" integer,
    "firstCall" boolean DEFAULT true,
    "lastCall" boolean DEFAULT true,
    "lastCallChatbot" boolean DEFAULT true,
    "n8nStatus" boolean DEFAULT false NOT NULL,
    "typebotRestart" text DEFAULT ''::text,
    "typebotOff" text DEFAULT ''::text,
    "typebotName" text DEFAULT ''::text,
    "typebotUrl" text DEFAULT ''::text,
    "chatflowTransfer" boolean DEFAULT false,
    "chatgptPrompt" text,
    "assistantId" text,
    "chatgptApiKey" text,
    "chatgptOrganizationId" text,
    "chatgptOff" text,
    imported timestamp with time zone,
    "difyStatus" boolean DEFAULT false NOT NULL,
    "difySessionId" character varying(255),
    "difyUrl" character varying(255),
    "difyType" character varying(255),
    "difyKey" character varying(255),
    "difyOff" character varying(255),
    "difyRestart" character varying(255),
    "lastMessageReceived" bigint,
    reasons text,
    value numeric(10,2) DEFAULT NULL::numeric,
    "lmHistory" jsonb,
    "lmStatus" boolean DEFAULT false NOT NULL,
    "ollamaHistory" jsonb,
    "ollamaStatus" boolean DEFAULT false NOT NULL,
    "geminiHistory" jsonb,
    "geminiStatus" boolean DEFAULT false NOT NULL,
    "grokStatus" boolean DEFAULT false NOT NULL,
    "grokHistory" jsonb,
    "qwenHistory" jsonb,
    "qwenStatus" boolean DEFAULT false NOT NULL,
    "deepseekStatus" boolean DEFAULT false NOT NULL,
    "deepseekHistory" jsonb,
    "claudeHistory" jsonb,
    "claudeStatus" boolean DEFAULT false NOT NULL,
    "lastPauseAt" numeric(20,0),
    "totalPauseTime" numeric(20,0) DEFAULT 0,
    "isPaused" boolean DEFAULT false NOT NULL,
    shared boolean,
    "userIdArray" jsonb
);


ALTER TABLE public."Tickets" OWNER TO postgres;

--
-- Name: Tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tickets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tickets_id_seq" OWNER TO postgres;

--
-- Name: Tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tickets_id_seq" OWNED BY public."Tickets".id;


--
-- Name: TodoLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TodoLists" (
    id bigint NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "limitDate" timestamp with time zone NOT NULL,
    owner text NOT NULL,
    status text NOT NULL,
    priority text NOT NULL,
    comments text,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ownerId" integer
);


ALTER TABLE public."TodoLists" OWNER TO postgres;

--
-- Name: TodoLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TodoLists_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TodoLists_id_seq" OWNER TO postgres;

--
-- Name: TodoLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TodoLists_id_seq" OWNED BY public."TodoLists".id;


--
-- Name: Tutorials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tutorials" (
    id character varying(255) NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    link text NOT NULL,
    thumbnail character varying(255),
    "isActive" boolean DEFAULT false,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Tutorials" OWNER TO postgres;

--
-- Name: UserMessagesLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserMessagesLog" (
    id integer NOT NULL,
    "messageId" character varying(255) DEFAULT NULL::character varying,
    "userId" integer,
    "ticketId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserMessagesLog" OWNER TO postgres;

--
-- Name: UserMessagesLog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserMessagesLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserMessagesLog_id_seq" OWNER TO postgres;

--
-- Name: UserMessagesLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserMessagesLog_id_seq" OWNED BY public."UserMessagesLog".id;


--
-- Name: UserPushSubscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserPushSubscriptions" (
    id bigint NOT NULL,
    "subscriptionData" text,
    "userId" integer,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deviceInfo" character varying(255) DEFAULT 'unknown'::character varying NOT NULL
);


ALTER TABLE public."UserPushSubscriptions" OWNER TO postgres;

--
-- Name: UserPushSubscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserPushSubscriptions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserPushSubscriptions_id_seq" OWNER TO postgres;

--
-- Name: UserPushSubscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserPushSubscriptions_id_seq" OWNED BY public."UserPushSubscriptions".id;


--
-- Name: UserWhatsapps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserWhatsapps" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "whatsappId" integer NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UserWhatsapps" OWNER TO postgres;

--
-- Name: UserWhatsapps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserWhatsapps_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserWhatsapps_id_seq" OWNER TO postgres;

--
-- Name: UserWhatsapps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserWhatsapps_id_seq" OWNED BY public."UserWhatsapps".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "passwordHash" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    profile character varying(255) DEFAULT 'admin'::character varying NOT NULL,
    "tokenVersion" integer DEFAULT 0 NOT NULL,
    "tenantId" integer DEFAULT 1 NOT NULL,
    "lastLogin" timestamp with time zone,
    "lastLogout" timestamp with time zone,
    "isOnline" boolean DEFAULT false,
    configs json,
    "lastOnline" timestamp with time zone,
    status character varying(255) DEFAULT 'offline'::character varying NOT NULL,
    "resetPasswordToken" character varying(255),
    "resetPasswordExpires" timestamp with time zone,
    "blockWavoip" boolean DEFAULT false,
    "menuPermissions" jsonb DEFAULT '{"filas": true, "grupo": true, "massa": true, "notas": true, "kanban": true, "equipes": true, "sessoes": true, "tarefas": true, "campanhas": true, "chat-flow": true, "etiquetas": true, "avaliacoes": true, "fechamento": true, "protocolos": true, "relatorios": true, "agendamentos": true, "aniversarios": true, "chat-privado": true, "mensagens-rapidas": true, "horarioAtendimento": true}'::jsonb,
    "sipEnabled" boolean DEFAULT false,
    "sipUsername" character varying(255),
    "sipPassword" character varying(255),
    "sipServer" character varying(255),
    "sipPort" integer,
    "sipTransport" public."enum_Users_sipTransport",
    "sipStatus" public."enum_Users_sipStatus" DEFAULT 'offline'::public."enum_Users_sipStatus",
    "sipLastRegistration" timestamp with time zone,
    "businessHours" jsonb DEFAULT '[{"day": 0, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Domingo"}, {"day": 1, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Segunda-Feira"}, {"day": 2, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Terça-Feira"}, {"day": 3, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Quarta-Feira"}, {"day": 4, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Quinta-Feira"}, {"day": 5, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Sexta-Feira"}, {"day": 6, "hr1": "08:00", "hr2": "12:00", "hr3": "14:00", "hr4": "18:00", "type": "O", "label": "Sábado"}]'::jsonb,
    "sessionId" character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: UsersPrivateGroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersPrivateGroups" (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UsersPrivateGroups" OWNER TO postgres;

--
-- Name: UsersPrivateGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UsersPrivateGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UsersPrivateGroups_id_seq" OWNER TO postgres;

--
-- Name: UsersPrivateGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UsersPrivateGroups_id_seq" OWNED BY public."UsersPrivateGroups".id;


--
-- Name: UsersQueues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersQueues" (
    id integer NOT NULL,
    "queueId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."UsersQueues" OWNER TO postgres;

--
-- Name: UsersQueues_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UsersQueues_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UsersQueues_id_seq" OWNER TO postgres;

--
-- Name: UsersQueues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UsersQueues_id_seq" OWNED BY public."UsersQueues".id;


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Whatsapps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Whatsapps" (
    id integer NOT NULL,
    session text,
    qrcode text,
    status character varying(255),
    battery character varying(255),
    plugged boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    name character varying(255) NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    retries integer DEFAULT 0 NOT NULL,
    "tenantId" integer DEFAULT 1 NOT NULL,
    phone jsonb,
    number text,
    "isDeleted" boolean DEFAULT false,
    "tokenTelegram" text,
    type character varying(255) DEFAULT 'whatsapp'::character varying NOT NULL,
    "instagramUser" text,
    "instagramKey" text,
    "tokenHook" text,
    "wabaBSP" character varying(255) DEFAULT NULL::character varying,
    "tokenAPI" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "fbPageId" text,
    "fbObject" jsonb,
    "farewellMessage" text,
    "chatFlowId" integer,
    "chatgptPrompt" text,
    "wordList" text,
    "profilePic" text,
    "assistantId" text,
    "wabaId" text,
    "bmToken" text,
    "typebotRestart" text,
    "typebotOff" text,
    "typebotName" text,
    "typebotUrl" text,
    "chatgptApiKey" text,
    "chatgptOrganizationId" text,
    "chatgptOff" text,
    "dialogflowJsonFilename" text,
    "dialogflowProjectId" text,
    "dialogflowLanguage" text,
    "dialogflowOff" text,
    "dialogflowJson" text,
    "sendEvaluation" text,
    "wppUser" text,
    "wppPass" text,
    "userId" integer,
    "queueId" integer,
    "queueIdImportMessages" integer,
    "isButton" text,
    "proxyUrl" text,
    "proxyUser" text,
    "proxyPass" text,
    webversion text,
    "remotePath" text,
    "selfDistribute" text,
    "wabaVersion" text,
    "importMessages" boolean DEFAULT false,
    "importOldMessages" text,
    "importRecentMessages" text,
    "statusImportMessages" text,
    "closedTicketsPostImported" boolean,
    "importOldMessagesGroups" boolean,
    "transcribeAudio" text,
    "transcribeAudioJson" jsonb,
    "n8nUrl" text,
    "destroyMessage" text,
    "difyUrl" text,
    "difyType" text,
    "difyKey" text,
    "difyOff" text,
    "difyRestart" text,
    "birthdayDate" text,
    "birthdayDateMessage" text DEFAULT NULL::character varying,
    "wavoipToken" text,
    "typebotUnknowMessage" text,
    "typebotButtonChoiceMessage" text,
    "closeKeyWord" text,
    "disableExternalIntegration" text,
    "birthdayDateFileName" text,
    "birthdayDateHour" text,
    "lmUrl" text,
    "lmModel" text,
    "lmOff" text,
    "lmPrompt" text,
    "waitProcessExternalInteraction" text,
    "ollamaUrl" text,
    "ollamaModel" text,
    "ollamaOff" text,
    "ollamaPrompt" text,
    "chatgptModel" text,
    "geminiUrl" text,
    "geminiModel" text,
    "geminiOff" text,
    "geminiPrompt" text,
    "grokUrl" text,
    "grokModel" text,
    "grokOff" text,
    "grokPrompt" text,
    "qwenUrl" text,
    "qwenModel" text,
    "qwenOff" text,
    "qwenPrompt" text,
    "deepseekUrl" text,
    "deepseekModel" text,
    "deepseekOff" text,
    "deepseekPrompt" text,
    "claudeUrl" text,
    "claudeModel" text,
    "claudeOff" text,
    "claudePrompt" text,
    "webPush" text,
    "chatgptVoiceModel" text,
    "chatgptVoice" text
);


ALTER TABLE public."Whatsapps" OWNER TO postgres;

--
-- Name: Whatsapps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Whatsapps_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Whatsapps_id_seq" OWNER TO postgres;

--
-- Name: Whatsapps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Whatsapps_id_seq" OWNED BY public."Whatsapps".id;


--
-- Name: WordLists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WordLists" (
    id integer NOT NULL,
    "groupId" character varying(255) NOT NULL,
    word text NOT NULL,
    "userId" integer,
    "tenantId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."WordLists" OWNER TO postgres;

--
-- Name: WordLists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WordLists_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."WordLists_id_seq" OWNER TO postgres;

--
-- Name: WordLists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WordLists_id_seq" OWNED BY public."WordLists".id;


--
-- Name: AutoReply id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReply" ALTER COLUMN id SET DEFAULT nextval('public."AutoReply_id_seq"'::regclass);


--
-- Name: AutoReplyLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReplyLogs" ALTER COLUMN id SET DEFAULT nextval('public."AutoReplyLogs_id_seq"'::regclass);


--
-- Name: BackupConfigs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BackupConfigs" ALTER COLUMN id SET DEFAULT nextval('public."BackupConfigs_id_seq"'::regclass);


--
-- Name: BackupResults id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BackupResults" ALTER COLUMN id SET DEFAULT nextval('public."BackupResults_id_seq"'::regclass);


--
-- Name: Baileys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Baileys" ALTER COLUMN id SET DEFAULT nextval('public."Baileys_id_seq"'::regclass);


--
-- Name: BaileysSessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BaileysSessions" ALTER COLUMN id SET DEFAULT nextval('public."BaileysSessions_id_seq"'::regclass);


--
-- Name: BanLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanLists" ALTER COLUMN id SET DEFAULT nextval('public."BanLists_id_seq"'::regclass);


--
-- Name: BirthdayMessagesSents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BirthdayMessagesSents" ALTER COLUMN id SET DEFAULT nextval('public."BirthdayMessagesSents_id_seq"'::regclass);


--
-- Name: CallLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CallLogs" ALTER COLUMN id SET DEFAULT nextval('public."CallLogs_id_seq"'::regclass);


--
-- Name: CampaignContacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CampaignContacts" ALTER COLUMN id SET DEFAULT nextval('public."CampaignContacts_id_seq"'::regclass);


--
-- Name: Campaigns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Campaigns" ALTER COLUMN id SET DEFAULT nextval('public."Campaigns_id_seq"'::regclass);


--
-- Name: ChatFlow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatFlow" ALTER COLUMN id SET DEFAULT nextval('public."ChatFlow_id_seq"'::regclass);


--
-- Name: ContactCustomFields id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactCustomFields" ALTER COLUMN id SET DEFAULT nextval('public."ContactCustomFields_id_seq"'::regclass);


--
-- Name: ContactTags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactTags" ALTER COLUMN id SET DEFAULT nextval('public."ContactTags_id_seq"'::regclass);


--
-- Name: ContactWallets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactWallets" ALTER COLUMN id SET DEFAULT nextval('public."ContactWallets_id_seq"'::regclass);


--
-- Name: Contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contacts" ALTER COLUMN id SET DEFAULT nextval('public."Contacts_id_seq"'::regclass);


--
-- Name: FarewellMessages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellMessages" ALTER COLUMN id SET DEFAULT nextval('public."FarewellMessages_id_seq"'::regclass);


--
-- Name: FarewellPrivateMessages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellPrivateMessages" ALTER COLUMN id SET DEFAULT nextval('public."FarewellPrivateMessages_id_seq"'::regclass);


--
-- Name: FastReply id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FastReply" ALTER COLUMN id SET DEFAULT nextval('public."FastReply_id_seq"'::regclass);


--
-- Name: GhostLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GhostLists" ALTER COLUMN id SET DEFAULT nextval('public."GhostLists_id_seq"'::regclass);


--
-- Name: GoogleCalendars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GoogleCalendars" ALTER COLUMN id SET DEFAULT nextval('public."GoogleCalendars_id_seq"'::regclass);


--
-- Name: GreetingMessages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GreetingMessages" ALTER COLUMN id SET DEFAULT nextval('public."GreetingMessages_id_seq"'::regclass);


--
-- Name: GroupLinkLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupLinkLists" ALTER COLUMN id SET DEFAULT nextval('public."GroupLinkLists_id_seq"'::regclass);


--
-- Name: GroupMessages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMessages" ALTER COLUMN id SET DEFAULT nextval('public."GroupMessages_id_seq"'::regclass);


--
-- Name: Kanbans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Kanbans" ALTER COLUMN id SET DEFAULT nextval('public."Kanbans_id_seq"'::regclass);


--
-- Name: LicenseActivationLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LicenseActivationLogs" ALTER COLUMN id SET DEFAULT nextval('public."LicenseActivationLogs_id_seq"'::regclass);


--
-- Name: LicenseRequestLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LicenseRequestLogs" ALTER COLUMN id SET DEFAULT nextval('public."LicenseRequestLogs_id_seq"'::regclass);


--
-- Name: Licenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Licenses" ALTER COLUMN id SET DEFAULT nextval('public."Licenses_id_seq"'::regclass);


--
-- Name: LogTickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogTickets" ALTER COLUMN id SET DEFAULT nextval('public."LogTickets_id_seq"'::regclass);


--
-- Name: MessageUpserts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageUpserts" ALTER COLUMN id SET DEFAULT nextval('public."MessageUpserts_id_seq"'::regclass);


--
-- Name: MessagesOffLine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesOffLine" ALTER COLUMN id SET DEFAULT nextval('public."MessagesOffLine_id_seq"'::regclass);


--
-- Name: Notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);


--
-- Name: Opportunitys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys" ALTER COLUMN id SET DEFAULT nextval('public."Opportunitys_id_seq"'::regclass);


--
-- Name: ParticipantsLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipantsLists" ALTER COLUMN id SET DEFAULT nextval('public."ParticipantsLists_id_seq"'::regclass);


--
-- Name: PipelineActionLogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActionLogs" ALTER COLUMN id SET DEFAULT nextval('public."PipelineActionLogs_id_seq"'::regclass);


--
-- Name: PipelineActions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions" ALTER COLUMN id SET DEFAULT nextval('public."PipelineActions_id_seq"'::regclass);


--
-- Name: Pipelines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pipelines" ALTER COLUMN id SET DEFAULT nextval('public."Pipelines_id_seq"'::regclass);


--
-- Name: Plans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plans" ALTER COLUMN id SET DEFAULT nextval('public."Plans_id_seq"'::regclass);


--
-- Name: PrivateMessage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage" ALTER COLUMN id SET DEFAULT nextval('public."PrivateMessage_id_seq"'::regclass);


--
-- Name: Queues id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Queues" ALTER COLUMN id SET DEFAULT nextval('public."Queues_id_seq"'::regclass);


--
-- Name: ReadPrivateMessageGroups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReadPrivateMessageGroups" ALTER COLUMN id SET DEFAULT nextval('public."ReadPrivateMessageGroups_id_seq"'::regclass);


--
-- Name: Reasons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reasons" ALTER COLUMN id SET DEFAULT nextval('public."Reasons_id_seq"'::regclass);


--
-- Name: Stages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stages" ALTER COLUMN id SET DEFAULT nextval('public."Stages_id_seq"'::regclass);


--
-- Name: StepsReply id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReply" ALTER COLUMN id SET DEFAULT nextval('public."StepsReply_id_seq"'::regclass);


--
-- Name: StepsReplyActions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions" ALTER COLUMN id SET DEFAULT nextval('public."StepsReplyActions_id_seq"'::regclass);


--
-- Name: Tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags" ALTER COLUMN id SET DEFAULT nextval('public."Tags_id_seq"'::regclass);


--
-- Name: TenantApis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenantApis" ALTER COLUMN id SET DEFAULT nextval('public."TenantApis_id_seq"'::regclass);


--
-- Name: Tenants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenants" ALTER COLUMN id SET DEFAULT nextval('public."Tenants_id_seq"'::regclass);


--
-- Name: TicketEvaluations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketEvaluations" ALTER COLUMN id SET DEFAULT nextval('public."TicketEvaluations_id_seq"'::regclass);


--
-- Name: TicketNotes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketNotes" ALTER COLUMN id SET DEFAULT nextval('public."TicketNotes_id_seq"'::regclass);


--
-- Name: TicketProtocols id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketProtocols" ALTER COLUMN id SET DEFAULT nextval('public."TicketProtocols_id_seq"'::regclass);


--
-- Name: TicketShareds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketShareds" ALTER COLUMN id SET DEFAULT nextval('public."TicketShareds_id_seq"'::regclass);


--
-- Name: Tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets" ALTER COLUMN id SET DEFAULT nextval('public."Tickets_id_seq"'::regclass);


--
-- Name: TodoLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoLists" ALTER COLUMN id SET DEFAULT nextval('public."TodoLists_id_seq"'::regclass);


--
-- Name: UserMessagesLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMessagesLog" ALTER COLUMN id SET DEFAULT nextval('public."UserMessagesLog_id_seq"'::regclass);


--
-- Name: UserPushSubscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPushSubscriptions" ALTER COLUMN id SET DEFAULT nextval('public."UserPushSubscriptions_id_seq"'::regclass);


--
-- Name: UserWhatsapps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserWhatsapps" ALTER COLUMN id SET DEFAULT nextval('public."UserWhatsapps_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: UsersPrivateGroups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersPrivateGroups" ALTER COLUMN id SET DEFAULT nextval('public."UsersPrivateGroups_id_seq"'::regclass);


--
-- Name: UsersQueues id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersQueues" ALTER COLUMN id SET DEFAULT nextval('public."UsersQueues_id_seq"'::regclass);


--
-- Name: Whatsapps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Whatsapps" ALTER COLUMN id SET DEFAULT nextval('public."Whatsapps_id_seq"'::regclass);


--
-- Name: WordLists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WordLists" ALTER COLUMN id SET DEFAULT nextval('public."WordLists_id_seq"'::regclass);


--
-- Name: ApiConfigs ApiConfigs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiConfigs"
    ADD CONSTRAINT "ApiConfigs_pkey" PRIMARY KEY (id);


--
-- Name: ApiMessages ApiMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiMessages"
    ADD CONSTRAINT "ApiMessages_pkey" PRIMARY KEY (id);


--
-- Name: AutoReplyLogs AutoReplyLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReplyLogs"
    ADD CONSTRAINT "AutoReplyLogs_pkey" PRIMARY KEY (id);


--
-- Name: AutoReply AutoReply_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReply"
    ADD CONSTRAINT "AutoReply_pkey" PRIMARY KEY (id);


--
-- Name: BackupConfigs BackupConfigs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BackupConfigs"
    ADD CONSTRAINT "BackupConfigs_pkey" PRIMARY KEY (id);


--
-- Name: BackupResults BackupResults_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BackupResults"
    ADD CONSTRAINT "BackupResults_pkey" PRIMARY KEY (id);


--
-- Name: BaileysSessions BaileysSessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BaileysSessions"
    ADD CONSTRAINT "BaileysSessions_pkey" PRIMARY KEY (id, "whatsappId");


--
-- Name: Baileys Baileys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Baileys"
    ADD CONSTRAINT "Baileys_pkey" PRIMARY KEY (id, "whatsappId");


--
-- Name: BanLists BanLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanLists"
    ADD CONSTRAINT "BanLists_pkey" PRIMARY KEY (id);


--
-- Name: BirthdayMessagesSents BirthdayMessagesSents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BirthdayMessagesSents"
    ADD CONSTRAINT "BirthdayMessagesSents_pkey" PRIMARY KEY (id);


--
-- Name: CallLogs CallLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CallLogs"
    ADD CONSTRAINT "CallLogs_pkey" PRIMARY KEY (id);


--
-- Name: CampaignContacts CampaignContacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CampaignContacts"
    ADD CONSTRAINT "CampaignContacts_pkey" PRIMARY KEY (id);


--
-- Name: Campaigns Campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Campaigns"
    ADD CONSTRAINT "Campaigns_pkey" PRIMARY KEY (id);


--
-- Name: ChatFlow ChatFlow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatFlow"
    ADD CONSTRAINT "ChatFlow_pkey" PRIMARY KEY (id);


--
-- Name: ContactCustomFields ContactCustomFields_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactCustomFields"
    ADD CONSTRAINT "ContactCustomFields_pkey" PRIMARY KEY (id);


--
-- Name: ContactTags ContactTags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactTags"
    ADD CONSTRAINT "ContactTags_pkey" PRIMARY KEY (id);


--
-- Name: ContactWallets ContactWallets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactWallets"
    ADD CONSTRAINT "ContactWallets_pkey" PRIMARY KEY (id);


--
-- Name: Contacts Contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);


--
-- Name: FarewellMessages FarewellMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellMessages"
    ADD CONSTRAINT "FarewellMessages_pkey" PRIMARY KEY (id);


--
-- Name: FarewellPrivateMessages FarewellPrivateMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellPrivateMessages"
    ADD CONSTRAINT "FarewellPrivateMessages_pkey" PRIMARY KEY (id);


--
-- Name: FastReply FastReply_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FastReply"
    ADD CONSTRAINT "FastReply_pkey" PRIMARY KEY (id);


--
-- Name: GhostLists GhostLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GhostLists"
    ADD CONSTRAINT "GhostLists_pkey" PRIMARY KEY (id);


--
-- Name: GoogleCalendars GoogleCalendars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GoogleCalendars"
    ADD CONSTRAINT "GoogleCalendars_pkey" PRIMARY KEY (id);


--
-- Name: GreetingMessages GreetingMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GreetingMessages"
    ADD CONSTRAINT "GreetingMessages_pkey" PRIMARY KEY (id);


--
-- Name: GroupLinkLists GroupLinkLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupLinkLists"
    ADD CONSTRAINT "GroupLinkLists_pkey" PRIMARY KEY (id);


--
-- Name: GroupMessages GroupMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMessages"
    ADD CONSTRAINT "GroupMessages_pkey" PRIMARY KEY (id);


--
-- Name: Kanbans Kanbans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Kanbans"
    ADD CONSTRAINT "Kanbans_pkey" PRIMARY KEY (id);


--
-- Name: LicenseActivationLogs LicenseActivationLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LicenseActivationLogs"
    ADD CONSTRAINT "LicenseActivationLogs_pkey" PRIMARY KEY (id);


--
-- Name: LicenseRequestLogs LicenseRequestLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LicenseRequestLogs"
    ADD CONSTRAINT "LicenseRequestLogs_pkey" PRIMARY KEY (id);


--
-- Name: Licenses Licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Licenses"
    ADD CONSTRAINT "Licenses_pkey" PRIMARY KEY (id);


--
-- Name: LogTickets LogTickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogTickets"
    ADD CONSTRAINT "LogTickets_pkey" PRIMARY KEY (id);


--
-- Name: MessageUpserts MessageUpserts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageUpserts"
    ADD CONSTRAINT "MessageUpserts_pkey" PRIMARY KEY (id);


--
-- Name: MessagesOffLine MessagesOffLine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesOffLine"
    ADD CONSTRAINT "MessagesOffLine_pkey" PRIMARY KEY (id);


--
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- Name: Opportunitys Opportunitys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys"
    ADD CONSTRAINT "Opportunitys_pkey" PRIMARY KEY (id);


--
-- Name: ParticipantsLists ParticipantsLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipantsLists"
    ADD CONSTRAINT "ParticipantsLists_pkey" PRIMARY KEY (id);


--
-- Name: PipelineActionLogs PipelineActionLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActionLogs"
    ADD CONSTRAINT "PipelineActionLogs_pkey" PRIMARY KEY (id);


--
-- Name: PipelineActions PipelineActions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_pkey" PRIMARY KEY (id);


--
-- Name: Pipelines Pipelines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pipelines"
    ADD CONSTRAINT "Pipelines_pkey" PRIMARY KEY (id);


--
-- Name: Plans Plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plans"
    ADD CONSTRAINT "Plans_pkey" PRIMARY KEY (id);


--
-- Name: PrivateMessage PrivateMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY (id);


--
-- Name: Queues Queues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Queues"
    ADD CONSTRAINT "Queues_pkey" PRIMARY KEY (id);


--
-- Name: ReadPrivateMessageGroups ReadPrivateMessageGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReadPrivateMessageGroups"
    ADD CONSTRAINT "ReadPrivateMessageGroups_pkey" PRIMARY KEY (id);


--
-- Name: Reasons Reasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reasons"
    ADD CONSTRAINT "Reasons_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Settings Settings_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Settings"
    ADD CONSTRAINT "Settings_id_key" UNIQUE (id);


--
-- Name: Stages Stages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stages"
    ADD CONSTRAINT "Stages_pkey" PRIMARY KEY (id);


--
-- Name: StepsReplyActions StepsReplyActions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions"
    ADD CONSTRAINT "StepsReplyActions_pkey" PRIMARY KEY (id);


--
-- Name: StepsReply StepsReply_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReply"
    ADD CONSTRAINT "StepsReply_pkey" PRIMARY KEY (id);


--
-- Name: Tags Tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY (id);


--
-- Name: TenantApis TenantApis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenantApis"
    ADD CONSTRAINT "TenantApis_pkey" PRIMARY KEY (id);


--
-- Name: Tenants Tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenants"
    ADD CONSTRAINT "Tenants_pkey" PRIMARY KEY (id);


--
-- Name: Tenants Tenants_websocketToken_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenants"
    ADD CONSTRAINT "Tenants_websocketToken_key" UNIQUE ("websocketToken");


--
-- Name: TicketEvaluations TicketEvaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketEvaluations"
    ADD CONSTRAINT "TicketEvaluations_pkey" PRIMARY KEY (id);


--
-- Name: TicketNotes TicketNotes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketNotes"
    ADD CONSTRAINT "TicketNotes_pkey" PRIMARY KEY (id);


--
-- Name: TicketProtocols TicketProtocols_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketProtocols"
    ADD CONSTRAINT "TicketProtocols_pkey" PRIMARY KEY (id);


--
-- Name: TicketShareds TicketShareds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketShareds"
    ADD CONSTRAINT "TicketShareds_pkey" PRIMARY KEY (id);


--
-- Name: Tickets Tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_pkey" PRIMARY KEY (id);


--
-- Name: TodoLists TodoLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoLists"
    ADD CONSTRAINT "TodoLists_pkey" PRIMARY KEY (id);


--
-- Name: Tutorials Tutorials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tutorials"
    ADD CONSTRAINT "Tutorials_pkey" PRIMARY KEY (id);


--
-- Name: UserMessagesLog UserMessagesLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMessagesLog"
    ADD CONSTRAINT "UserMessagesLog_pkey" PRIMARY KEY (id);


--
-- Name: UserPushSubscriptions UserPushSubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPushSubscriptions"
    ADD CONSTRAINT "UserPushSubscriptions_pkey" PRIMARY KEY (id);


--
-- Name: UserWhatsapps UserWhatsapps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserWhatsapps"
    ADD CONSTRAINT "UserWhatsapps_pkey" PRIMARY KEY (id);


--
-- Name: UsersPrivateGroups UsersPrivateGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersPrivateGroups"
    ADD CONSTRAINT "UsersPrivateGroups_pkey" PRIMARY KEY (id);


--
-- Name: UsersQueues UsersQueues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersQueues"
    ADD CONSTRAINT "UsersQueues_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Whatsapps Whatsapps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Whatsapps"
    ADD CONSTRAINT "Whatsapps_pkey" PRIMARY KEY (id);


--
-- Name: WordLists WordLists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WordLists"
    ADD CONSTRAINT "WordLists_pkey" PRIMARY KEY (id);


--
-- Name: BackupConfigs backup_configs_tenantId_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BackupConfigs"
    ADD CONSTRAINT "backup_configs_tenantId_unique" UNIQUE ("tenantId");


--
-- Name: Tags unique_constraint_tag_tenant; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT unique_constraint_tag_tenant UNIQUE (tag, "tenantId");


--
-- Name: ContactTags unique_contact_tag_tenant; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactTags"
    ADD CONSTRAINT unique_contact_tag_tenant UNIQUE ("contactId", "tagId", "tenantId");


--
-- Name: ContactWallets unique_contact_wallet_tenant; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactWallets"
    ADD CONSTRAINT unique_contact_wallet_tenant UNIQUE ("contactId", "walletId", "tenantId");


--
-- Name: TicketShareds unique_ticket_shared_per_ticket; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketShareds"
    ADD CONSTRAINT unique_ticket_shared_per_ticket UNIQUE ("ticketId", "tenantId");


--
-- Name: backup_configs_storage_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX backup_configs_storage_type ON public."BackupConfigs" USING btree ("storageType");


--
-- Name: backup_configs_tenantId_unique_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "backup_configs_tenantId_unique_index" ON public."BackupConfigs" USING btree ("tenantId");


--
-- Name: backup_results_backup_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX backup_results_backup_type ON public."BackupResults" USING btree ("backupType");


--
-- Name: backup_results_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX backup_results_created_at ON public."BackupResults" USING btree ("createdAt");


--
-- Name: backup_results_database_success_files_success; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX backup_results_database_success_files_success ON public."BackupResults" USING btree ("databaseSuccess", "filesSuccess");


--
-- Name: backup_results_tenant_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX backup_results_tenant_id ON public."BackupResults" USING btree ("tenantId");


--
-- Name: contactcustomfields_contactid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contactcustomfields_contactid_idx ON public."ContactCustomFields" USING btree ("contactId");


--
-- Name: contacts_number_tenantid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX contacts_number_tenantid ON public."Contacts" USING btree (number, "tenantId");


--
-- Name: contacttags_contactid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacttags_contactid_idx ON public."ContactTags" USING btree ("contactId");


--
-- Name: contactwallets_contactid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contactwallets_contactid_idx ON public."ContactWallets" USING btree ("contactId");


--
-- Name: google_calendars_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX google_calendars_created_at ON public."GoogleCalendars" USING btree ("createdAt");


--
-- Name: google_calendars_is_active; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX google_calendars_is_active ON public."GoogleCalendars" USING btree ("isActive");


--
-- Name: google_calendars_tenant_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX google_calendars_tenant_id ON public."GoogleCalendars" USING btree ("tenantId");


--
-- Name: idx_Messages_contact_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "idx_Messages_contact_id" ON public."Messages" USING btree ("contactId");


--
-- Name: idx_contactTag_contact_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "idx_contactTag_contact_id" ON public."ContactTags" USING btree ("contactId");


--
-- Name: idx_contactTag_tagId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "idx_contactTag_tagId" ON public."ContactTags" USING btree ("tagId");


--
-- Name: idx_contactTag_tag_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "idx_contactTag_tag_id" ON public."ContactTags" USING btree ("tagId");


--
-- Name: idx_contact_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contact_id ON public."Contacts" USING btree (id);


--
-- Name: idx_contact_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contact_name ON public."Contacts" USING btree (name);


--
-- Name: idx_contact_number; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contact_number ON public."Contacts" USING btree (number);


--
-- Name: idx_contact_tenant_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contact_tenant_id ON public."Contacts" USING btree ("tenantId");


--
-- Name: idx_contacts_tenant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contacts_tenant ON public."Contacts" USING btree ("tenantId");


--
-- Name: idx_contactwallets_wallet_contact; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_contactwallets_wallet_contact ON public."ContactWallets" USING btree ("walletId", "contactId");


--
-- Name: idx_message_quoted_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_message_quoted_id ON public."Messages" USING btree ("quotedMsgId");


--
-- Name: idx_message_tenant_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_message_tenant_id ON public."Messages" USING btree ("tenantId");


--
-- Name: idx_message_ticket_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_message_ticket_id ON public."Messages" USING btree ("ticketId");


--
-- Name: idx_opportunity_closing_forecast; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_closing_forecast ON public."Opportunitys" USING btree ("closingForecast");


--
-- Name: idx_opportunity_contact; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_contact ON public."Opportunitys" USING btree ("contactId");


--
-- Name: idx_opportunity_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_created_at ON public."Opportunitys" USING btree ("createdAt");


--
-- Name: idx_opportunity_pipeline_stage; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_pipeline_stage ON public."Opportunitys" USING btree ("pipelineId", "stageId");


--
-- Name: idx_opportunity_responsible_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_responsible_status ON public."Opportunitys" USING btree ("responsibleId", status);


--
-- Name: idx_opportunity_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_status ON public."Opportunitys" USING btree (status);


--
-- Name: idx_opportunity_tenant; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_tenant ON public."Opportunitys" USING btree ("tenantId");


--
-- Name: idx_opportunity_value; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_opportunity_value ON public."Opportunitys" USING btree (value);


--
-- Name: idx_queues_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_queues_id ON public."Queues" USING btree (id);


--
-- Name: idx_ticket_contact_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_contact_id ON public."Tickets" USING btree ("contactId");


--
-- Name: idx_ticket_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_id ON public."Tickets" USING btree (id);


--
-- Name: idx_ticket_queue_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_queue_id ON public."Tickets" USING btree ("queueId");


--
-- Name: idx_ticket_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_status ON public."Tickets" USING btree (status);


--
-- Name: idx_ticket_tenant_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_tenant_id ON public."Tickets" USING btree ("tenantId");


--
-- Name: idx_ticket_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_user_id ON public."Tickets" USING btree ("userId");


--
-- Name: idx_ticket_whatsapp_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ticket_whatsapp_id ON public."Tickets" USING btree ("whatsappId");


--
-- Name: idx_tickets_combined; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tickets_combined ON public."Tickets" USING btree ("tenantId", status, "queueId", "userId", "contactId", "whatsappId");


--
-- Name: idx_tickets_isgroup_unread; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tickets_isgroup_unread ON public."Tickets" USING btree ("isGroup", "unreadMessages");


--
-- Name: idx_tickets_tenant_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tickets_tenant_status ON public."Tickets" USING btree ("tenantId", status);


--
-- Name: idx_tickets_tenantid_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_tickets_tenantid_status ON public."Tickets" USING btree ("tenantId", status);


--
-- Name: idx_users_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_id ON public."Users" USING btree (id);


--
-- Name: messages_fromme_del_sched_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_fromme_del_sched_idx ON public."Messages" USING btree ("fromMe", "isDeleted", status, "messageId", "scheduleDate");


--
-- Name: pipeline_action_logs_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pipeline_action_logs_created_at ON public."PipelineActionLogs" USING btree ("createdAt");


--
-- Name: pipeline_action_logs_opportunity_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pipeline_action_logs_opportunity_id ON public."PipelineActionLogs" USING btree ("opportunityId");


--
-- Name: pipeline_action_logs_pipeline_action_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pipeline_action_logs_pipeline_action_id ON public."PipelineActionLogs" USING btree ("pipelineActionId");


--
-- Name: pipeline_action_logs_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pipeline_action_logs_status ON public."PipelineActionLogs" USING btree (status);


--
-- Name: pipeline_action_logs_tenant_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pipeline_action_logs_tenant_id ON public."PipelineActionLogs" USING btree ("tenantId");


--
-- Name: pipeline_action_logs_updated_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pipeline_action_logs_updated_at ON public."PipelineActionLogs" USING btree ("updatedAt");


--
-- Name: settings_tenant_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX settings_tenant_idx ON public."Settings" USING btree ("tenantId");


--
-- Name: settings_tenant_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX settings_tenant_key_idx ON public."Settings" USING btree ("tenantId", key);


--
-- Name: tickets_ten_wha_id_cha_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tickets_ten_wha_id_cha_idx ON public."Tickets" USING btree ("tenantId", "whatsappId", channel);


--
-- Name: usersqueues_user_query_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usersqueues_user_query_id_idx ON public."UsersQueues" USING btree ("userId", "queueId");


--
-- Name: usersqueues_userid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX usersqueues_userid_idx ON public."UsersQueues" USING btree ("userId");


--
-- Name: ApiConfigs ApiConfigs_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiConfigs"
    ADD CONSTRAINT "ApiConfigs_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ApiConfigs ApiConfigs_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiConfigs"
    ADD CONSTRAINT "ApiConfigs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ApiConfigs ApiConfigs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiConfigs"
    ADD CONSTRAINT "ApiConfigs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ApiMessages ApiMessages_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiMessages"
    ADD CONSTRAINT "ApiMessages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ApiMessages ApiMessages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ApiMessages"
    ADD CONSTRAINT "ApiMessages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AutoReplyLogs AutoReplyLogs_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReplyLogs"
    ADD CONSTRAINT "AutoReplyLogs_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AutoReplyLogs AutoReplyLogs_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReplyLogs"
    ADD CONSTRAINT "AutoReplyLogs_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AutoReply AutoReply_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReply"
    ADD CONSTRAINT "AutoReply_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AutoReply AutoReply_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AutoReply"
    ADD CONSTRAINT "AutoReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BackupConfigs BackupConfigs_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BackupConfigs"
    ADD CONSTRAINT "BackupConfigs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BanLists BanLists_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanLists"
    ADD CONSTRAINT "BanLists_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BanLists BanLists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BanLists"
    ADD CONSTRAINT "BanLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BirthdayMessagesSents BirthdayMessagesSents_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BirthdayMessagesSents"
    ADD CONSTRAINT "BirthdayMessagesSents_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BirthdayMessagesSents BirthdayMessagesSents_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BirthdayMessagesSents"
    ADD CONSTRAINT "BirthdayMessagesSents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BirthdayMessagesSents BirthdayMessagesSents_whatsappId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BirthdayMessagesSents"
    ADD CONSTRAINT "BirthdayMessagesSents_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CallLogs CallLogs_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CallLogs"
    ADD CONSTRAINT "CallLogs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CallLogs CallLogs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CallLogs"
    ADD CONSTRAINT "CallLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CampaignContacts CampaignContacts_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CampaignContacts"
    ADD CONSTRAINT "CampaignContacts_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public."Campaigns"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CampaignContacts CampaignContacts_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CampaignContacts"
    ADD CONSTRAINT "CampaignContacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Campaigns Campaigns_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Campaigns"
    ADD CONSTRAINT "Campaigns_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Campaigns Campaigns_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Campaigns"
    ADD CONSTRAINT "Campaigns_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Campaigns Campaigns_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Campaigns"
    ADD CONSTRAINT "Campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ChatFlow ChatFlow_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatFlow"
    ADD CONSTRAINT "ChatFlow_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ChatFlow ChatFlow_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ChatFlow"
    ADD CONSTRAINT "ChatFlow_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactCustomFields ContactCustomFields_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactCustomFields"
    ADD CONSTRAINT "ContactCustomFields_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactTags ContactTags_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactTags"
    ADD CONSTRAINT "ContactTags_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactTags ContactTags_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactTags"
    ADD CONSTRAINT "ContactTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tags"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ContactTags ContactTags_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactTags"
    ADD CONSTRAINT "ContactTags_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactWallets ContactWallets_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactWallets"
    ADD CONSTRAINT "ContactWallets_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactWallets ContactWallets_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactWallets"
    ADD CONSTRAINT "ContactWallets_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactWallets ContactWallets_walletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactWallets"
    ADD CONSTRAINT "ContactWallets_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Contacts Contacts_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: FarewellMessages FarewellMessages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellMessages"
    ADD CONSTRAINT "FarewellMessages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FarewellMessages FarewellMessages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellMessages"
    ADD CONSTRAINT "FarewellMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FarewellPrivateMessages FarewellPrivateMessages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellPrivateMessages"
    ADD CONSTRAINT "FarewellPrivateMessages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FarewellPrivateMessages FarewellPrivateMessages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FarewellPrivateMessages"
    ADD CONSTRAINT "FarewellPrivateMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FastReply FastReply_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FastReply"
    ADD CONSTRAINT "FastReply_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: FastReply FastReply_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FastReply"
    ADD CONSTRAINT "FastReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GhostLists GhostLists_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GhostLists"
    ADD CONSTRAINT "GhostLists_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GhostLists GhostLists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GhostLists"
    ADD CONSTRAINT "GhostLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GoogleCalendars GoogleCalendars_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GoogleCalendars"
    ADD CONSTRAINT "GoogleCalendars_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GreetingMessages GreetingMessages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GreetingMessages"
    ADD CONSTRAINT "GreetingMessages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GreetingMessages GreetingMessages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GreetingMessages"
    ADD CONSTRAINT "GreetingMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GroupLinkLists GroupLinkLists_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupLinkLists"
    ADD CONSTRAINT "GroupLinkLists_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GroupLinkLists GroupLinkLists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupLinkLists"
    ADD CONSTRAINT "GroupLinkLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GroupMessages GroupMessages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMessages"
    ADD CONSTRAINT "GroupMessages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GroupMessages GroupMessages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GroupMessages"
    ADD CONSTRAINT "GroupMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Kanbans Kanbans_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Kanbans"
    ADD CONSTRAINT "Kanbans_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LogTickets LogTickets_queueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogTickets"
    ADD CONSTRAINT "LogTickets_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES public."Queues"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LogTickets LogTickets_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogTickets"
    ADD CONSTRAINT "LogTickets_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LogTickets LogTickets_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogTickets"
    ADD CONSTRAINT "LogTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LogTickets LogTickets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogTickets"
    ADD CONSTRAINT "LogTickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MessageUpserts MessageUpserts_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageUpserts"
    ADD CONSTRAINT "MessageUpserts_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MessageUpserts MessageUpserts_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageUpserts"
    ADD CONSTRAINT "MessageUpserts_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MessageUpserts MessageUpserts_whatsappId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessageUpserts"
    ADD CONSTRAINT "MessageUpserts_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MessagesOffLine MessagesOffLine_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesOffLine"
    ADD CONSTRAINT "MessagesOffLine_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MessagesOffLine MessagesOffLine_quotedMsgId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesOffLine"
    ADD CONSTRAINT "MessagesOffLine_quotedMsgId_fkey" FOREIGN KEY ("quotedMsgId") REFERENCES public."Messages"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MessagesOffLine MessagesOffLine_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesOffLine"
    ADD CONSTRAINT "MessagesOffLine_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MessagesOffLine MessagesOffLine_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MessagesOffLine"
    ADD CONSTRAINT "MessagesOffLine_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Messages Messages_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Messages Messages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Messages Messages_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Messages Messages_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notifications Notifications_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notifications Notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Opportunitys Opportunitys_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys"
    ADD CONSTRAINT "Opportunitys_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON DELETE CASCADE;


--
-- Name: Opportunitys Opportunitys_pipelineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys"
    ADD CONSTRAINT "Opportunitys_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES public."Pipelines"(id) ON DELETE CASCADE;


--
-- Name: Opportunitys Opportunitys_responsibleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys"
    ADD CONSTRAINT "Opportunitys_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Opportunitys Opportunitys_stageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys"
    ADD CONSTRAINT "Opportunitys_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES public."Stages"(id) ON DELETE CASCADE;


--
-- Name: Opportunitys Opportunitys_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Opportunitys"
    ADD CONSTRAINT "Opportunitys_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON DELETE CASCADE;


--
-- Name: ParticipantsLists ParticipantsLists_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipantsLists"
    ADD CONSTRAINT "ParticipantsLists_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ParticipantsLists ParticipantsLists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ParticipantsLists"
    ADD CONSTRAINT "ParticipantsLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PipelineActionLogs PipelineActionLogs_opportunityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActionLogs"
    ADD CONSTRAINT "PipelineActionLogs_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES public."Opportunitys"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PipelineActionLogs PipelineActionLogs_pipelineActionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActionLogs"
    ADD CONSTRAINT "PipelineActionLogs_pipelineActionId_fkey" FOREIGN KEY ("pipelineActionId") REFERENCES public."PipelineActions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PipelineActionLogs PipelineActionLogs_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActionLogs"
    ADD CONSTRAINT "PipelineActionLogs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PipelineActions PipelineActions_pipelineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES public."Pipelines"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PipelineActions PipelineActions_stageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES public."Stages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PipelineActions PipelineActions_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tags"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PipelineActions PipelineActions_targetStageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_targetStageId_fkey" FOREIGN KEY ("targetStageId") REFERENCES public."Stages"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PipelineActions PipelineActions_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PipelineActions PipelineActions_walletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PipelineActions PipelineActions_whatsappId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PipelineActions"
    ADD CONSTRAINT "PipelineActions_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Pipelines Pipelines_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pipelines"
    ADD CONSTRAINT "Pipelines_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON DELETE CASCADE;


--
-- Name: Plans Plans_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plans"
    ADD CONSTRAINT "Plans_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Plans Plans_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Plans"
    ADD CONSTRAINT "Plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PrivateMessage PrivateMessage_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."GroupMessages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PrivateMessage PrivateMessage_groupId_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_groupId_fkey1" FOREIGN KEY ("groupId") REFERENCES public."GroupMessages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PrivateMessage PrivateMessage_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PrivateMessage PrivateMessage_receiverId_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_receiverId_fkey1" FOREIGN KEY ("receiverId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PrivateMessage PrivateMessage_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PrivateMessage PrivateMessage_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PrivateMessage"
    ADD CONSTRAINT "PrivateMessage_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Queues Queues_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Queues"
    ADD CONSTRAINT "Queues_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Queues Queues_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Queues"
    ADD CONSTRAINT "Queues_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ReadPrivateMessageGroups ReadPrivateMessageGroups_internalMessageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReadPrivateMessageGroups"
    ADD CONSTRAINT "ReadPrivateMessageGroups_internalMessageId_fkey" FOREIGN KEY ("internalMessageId") REFERENCES public."PrivateMessage"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ReadPrivateMessageGroups ReadPrivateMessageGroups_userGroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReadPrivateMessageGroups"
    ADD CONSTRAINT "ReadPrivateMessageGroups_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES public."UsersPrivateGroups"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Reasons Reasons_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reasons"
    ADD CONSTRAINT "Reasons_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Stages Stages_pipelineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stages"
    ADD CONSTRAINT "Stages_pipelineId_fkey" FOREIGN KEY ("pipelineId") REFERENCES public."Pipelines"(id) ON DELETE CASCADE;


--
-- Name: Stages Stages_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Stages"
    ADD CONSTRAINT "Stages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON DELETE CASCADE;


--
-- Name: StepsReplyActions StepsReplyActions_nextStep_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions"
    ADD CONSTRAINT "StepsReplyActions_nextStep_fkey" FOREIGN KEY ("nextStepId") REFERENCES public."StepsReply"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StepsReplyActions StepsReplyActions_queueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions"
    ADD CONSTRAINT "StepsReplyActions_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES public."Queues"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StepsReplyActions StepsReplyActions_stepReplyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions"
    ADD CONSTRAINT "StepsReplyActions_stepReplyId_fkey" FOREIGN KEY ("stepReplyId") REFERENCES public."StepsReply"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StepsReplyActions StepsReplyActions_userIdDestination_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions"
    ADD CONSTRAINT "StepsReplyActions_userIdDestination_fkey" FOREIGN KEY ("userIdDestination") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: StepsReplyActions StepsReplyActions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReplyActions"
    ADD CONSTRAINT "StepsReplyActions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: StepsReply StepsReply_idAutoReply_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReply"
    ADD CONSTRAINT "StepsReply_idAutoReply_fkey" FOREIGN KEY ("idAutoReply") REFERENCES public."AutoReply"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StepsReply StepsReply_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StepsReply"
    ADD CONSTRAINT "StepsReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tags Tags_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tags Tags_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TenantApis TenantApis_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TenantApis"
    ADD CONSTRAINT "TenantApis_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tenants Tenants_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tenants"
    ADD CONSTRAINT "Tenants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TicketEvaluations TicketEvaluations_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketEvaluations"
    ADD CONSTRAINT "TicketEvaluations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TicketEvaluations TicketEvaluations_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketEvaluations"
    ADD CONSTRAINT "TicketEvaluations_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TicketNotes TicketNotes_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketNotes"
    ADD CONSTRAINT "TicketNotes_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TicketNotes TicketNotes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketNotes"
    ADD CONSTRAINT "TicketNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TicketProtocols TicketProtocols_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketProtocols"
    ADD CONSTRAINT "TicketProtocols_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TicketProtocols TicketProtocols_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketProtocols"
    ADD CONSTRAINT "TicketProtocols_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TicketShareds TicketShareds_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketShareds"
    ADD CONSTRAINT "TicketShareds_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TicketShareds TicketShareds_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketShareds"
    ADD CONSTRAINT "TicketShareds_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TicketShareds TicketShareds_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketShareds"
    ADD CONSTRAINT "TicketShareds_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tickets Tickets_contactId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contacts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tickets Tickets_queueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES public."Queues"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Tickets Tickets_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Tickets Tickets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tickets Tickets_whatsappId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tickets"
    ADD CONSTRAINT "Tickets_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: TodoLists TodoLists_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoLists"
    ADD CONSTRAINT "TodoLists_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TodoLists TodoLists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoLists"
    ADD CONSTRAINT "TodoLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Tutorials Tutorials_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tutorials"
    ADD CONSTRAINT "Tutorials_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserMessagesLog UserMessagesLog_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMessagesLog"
    ADD CONSTRAINT "UserMessagesLog_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public."Tickets"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserMessagesLog UserMessagesLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserMessagesLog"
    ADD CONSTRAINT "UserMessagesLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserPushSubscriptions UserPushSubscriptions_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPushSubscriptions"
    ADD CONSTRAINT "UserPushSubscriptions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserPushSubscriptions UserPushSubscriptions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserPushSubscriptions"
    ADD CONSTRAINT "UserPushSubscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserWhatsapps UserWhatsapps_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserWhatsapps"
    ADD CONSTRAINT "UserWhatsapps_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserWhatsapps UserWhatsapps_whatsappId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserWhatsapps"
    ADD CONSTRAINT "UserWhatsapps_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES public."Whatsapps"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsersPrivateGroups UsersPrivateGroups_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersPrivateGroups"
    ADD CONSTRAINT "UsersPrivateGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."GroupMessages"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsersPrivateGroups UsersPrivateGroups_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersPrivateGroups"
    ADD CONSTRAINT "UsersPrivateGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsersQueues UsersQueues_queueId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersQueues"
    ADD CONSTRAINT "UsersQueues_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES public."Queues"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsersQueues UsersQueues_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersQueues"
    ADD CONSTRAINT "UsersQueues_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Users Users_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Whatsapps Whatsapps_chatFlowId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Whatsapps"
    ADD CONSTRAINT "Whatsapps_chatFlowId_fkey" FOREIGN KEY ("chatFlowId") REFERENCES public."ChatFlow"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Whatsapps Whatsapps_queueIdImportMessages_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Whatsapps"
    ADD CONSTRAINT "Whatsapps_queueIdImportMessages_fkey" FOREIGN KEY ("queueIdImportMessages") REFERENCES public."Queues"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Whatsapps Whatsapps_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Whatsapps"
    ADD CONSTRAINT "Whatsapps_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WordLists WordLists_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WordLists"
    ADD CONSTRAINT "WordLists_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenants"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WordLists WordLists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WordLists"
    ADD CONSTRAINT "WordLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict L8QcyYEmTXGurv5SiLYveE1Iu5daE1yk8WFUKZ5cgagvBH4Fh6ndEyUjY1HawNe

