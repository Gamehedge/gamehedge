--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: active_admin_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE active_admin_comments (
    id integer NOT NULL,
    namespace character varying,
    body text,
    resource_id character varying NOT NULL,
    resource_type character varying NOT NULL,
    author_id integer,
    author_type character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE active_admin_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE active_admin_comments_id_seq OWNED BY active_admin_comments.id;


--
-- Name: admin_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE admin_sequence2
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = true;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE admin (
    id integer DEFAULT nextval('admin_sequence2'::regclass) NOT NULL,
    username character varying(80),
    password character varying(765),
    firstname character varying(20),
    lastname character varying(20),
    email character varying(80),
    last_login_ip bigint,
    last_login_date timestamp without time zone,
    create_date timestamp without time zone,
    modified_date timestamp without time zone
);


--
-- Name: admin_access_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE admin_access_sequence2
    START WITH 200
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_access; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE admin_access (
    id integer DEFAULT nextval('admin_access_sequence2'::regclass) NOT NULL,
    admin_id integer,
    module character varying(20),
    access_id smallint,
    create_date timestamp without time zone,
    modified_date timestamp without time zone
);


--
-- Name: admin_access_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE admin_access_sequence
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE admin_sequence
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_session_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE admin_session_data (
    sess_id character varying(128) NOT NULL,
    sess_data text,
    create_date timestamp without time zone,
    modified_date timestamp without time zone
);


SET default_with_oids = false;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE admin_users (
    id integer NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE admin_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE admin_users_id_seq OWNED BY admin_users.id;


--
-- Name: admin_users_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE admin_users_permissions (
    id integer NOT NULL,
    admin_user_id integer,
    permission_id integer
);


--
-- Name: admin_users_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE admin_users_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_users_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE admin_users_permissions_id_seq OWNED BY admin_users_permissions.id;


--
-- Name: clients_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE clients_sequence2
    START WITH 9000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = true;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE clients (
    id bigint DEFAULT nextval('clients_sequence2'::regclass) NOT NULL,
    name character varying(80) NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    password text,
    te_uid bigint,
    optin smallint DEFAULT 0,
    last_login_ip bigint,
    last_login_date timestamp without time zone,
    create_date timestamp without time zone,
    modified_date timestamp without time zone,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    temporal_pass character varying
);


--
-- Name: clients_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE clients_sequence
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = false;

--
-- Name: divisions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE divisions (
    id integer NOT NULL,
    name character varying,
    description text,
    sport_id integer,
    division_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    image_file_name character varying,
    image_content_type character varying,
    image_file_size integer,
    image_updated_at timestamp without time zone,
    is_main_division boolean
);


--
-- Name: divisions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE divisions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: divisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE divisions_id_seq OWNED BY divisions.id;


--
-- Name: events_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE events_sequence2
    START WITH 160000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = true;

--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE events (
    id integer DEFAULT nextval('events_sequence2'::regclass) NOT NULL,
    te_uid integer,
    te_performer_home_id integer,
    te_performer_visit_id integer,
    data_event text,
    te_date timestamp without time zone,
    name character varying,
    url character varying,
    home_performer_id integer,
    away_performer_id integer,
    venue_id integer,
    occurs_at timestamp without time zone,
    location character varying,
    te_venue_id integer,
    sport_id integer,
    slug character varying
);


--
-- Name: events_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE events_sequence
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: performers_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE performers_sequence2
    START WITH 300
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: performers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE performers (
    id integer DEFAULT nextval('performers_sequence2'::regclass) NOT NULL,
    te_uid integer,
    te_name character varying(255),
    te_slug character varying(255),
    division_id integer,
    image_file_name character varying,
    image_content_type character varying,
    image_file_size integer,
    image_updated_at timestamp without time zone,
    sport_id integer,
    venue_id integer,
    name character varying,
    url character varying,
    wins integer,
    losses integer,
    description text,
    slug character varying
);


SET default_with_oids = false;

--
-- Name: players; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE players (
    id integer NOT NULL,
    name character varying,
    performer_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: venues; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE venues (
    id integer NOT NULL,
    name character varying,
    address text,
    te_uid integer,
    location character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    url character varying,
    image_file_name character varying,
    image_content_type character varying,
    image_file_size integer,
    image_updated_at timestamp without time zone,
    description text,
    slug character varying
);


--
-- Name: main_searches; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW main_searches AS
 SELECT performers.id AS searchable_id,
    'Performer'::text AS searchable_type,
    performers.te_name AS term
   FROM performers
UNION
 SELECT venues.id AS searchable_id,
    'Venue'::text AS searchable_type,
    venues.name AS term
   FROM venues
UNION
 SELECT events.id AS searchable_id,
    'Event'::text AS searchable_type,
    events.name AS term
   FROM events
UNION
 SELECT performers.id AS searchable_id,
    'Performer'::text AS searchable_type,
    players.name AS term
   FROM (performers
     JOIN players ON ((players.performer_id = performers.id)));


--
-- Name: order_stats_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE order_stats_sequence2
    START WITH 1600
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = true;

--
-- Name: order_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE order_stats (
    id integer DEFAULT nextval('order_stats_sequence2'::regclass) NOT NULL,
    num integer DEFAULT 0,
    stat_date date
);


--
-- Name: order_stats_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE order_stats_sequence
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_sequence2; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE orders_sequence2
    START WITH 2800
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE orders (
    id integer DEFAULT nextval('orders_sequence2'::regclass) NOT NULL,
    client_id integer NOT NULL,
    client_name character varying(80),
    te_order_id bigint,
    event_name character varying(255),
    event_home_team character varying(100),
    event_away_team character varying(100),
    event_date character varying(20),
    event_location character varying(765),
    ticket_section character varying(100),
    ticket_row character varying(50),
    ticket_seats character varying(50),
    ticket_format character varying(24),
    total integer,
    cost integer,
    order_data text,
    ticket_data text,
    event_data text,
    home_team_data text,
    away_team_data text,
    refund_status character varying(20) DEFAULT 'none'::character varying,
    create_date timestamp without time zone,
    modified_date timestamp without time zone,
    refund_status_id integer,
    real_event_date timestamp without time zone,
    order_status character varying
);


--
-- Name: orders_sequence; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE orders_sequence
    START WITH 500
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_with_oids = false;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE permissions (
    id integer NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE permissions_id_seq OWNED BY permissions.id;


--
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE players_id_seq OWNED BY players.id;


--
-- Name: promo_codes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE promo_codes (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    value double precision,
    is_percentage boolean,
    name character varying,
    code character varying,
    start_date date,
    end_date date,
    active boolean
);


--
-- Name: promo_codes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE promo_codes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promo_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE promo_codes_id_seq OWNED BY promo_codes.id;


--
-- Name: refund_statuses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE refund_statuses (
    id integer NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: refund_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE refund_statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refund_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE refund_statuses_id_seq OWNED BY refund_statuses.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: service_fees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE service_fees (
    id integer NOT NULL,
    minimum_amount numeric(8,2),
    fee_amount double precision,
    description character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: service_fees_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE service_fees_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: service_fees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE service_fees_id_seq OWNED BY service_fees.id;


SET default_with_oids = true;

--
-- Name: session_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE session_data (
    sess_id character varying(128) NOT NULL,
    sess_data text,
    create_date timestamp without time zone,
    modified_date timestamp without time zone
);


SET default_with_oids = false;

--
-- Name: sports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE sports (
    id integer NOT NULL,
    name character varying,
    description text,
    te_uid integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    image_file_name character varying,
    image_content_type character varying,
    image_file_size integer,
    image_updated_at timestamp without time zone,
    url character varying,
    ggg character varying,
    slug character varying,
    active boolean
);


--
-- Name: sports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE sports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE sports_id_seq OWNED BY sports.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE testimonials (
    id integer NOT NULL,
    author character varying,
    description text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    performer_id integer,
    image_file_name character varying,
    image_content_type character varying,
    image_file_size integer,
    image_updated_at timestamp without time zone
);


--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE testimonials_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE testimonials_id_seq OWNED BY testimonials.id;


--
-- Name: tile_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tile_types (
    id integer NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    te_uid integer
);


--
-- Name: tile_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tile_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tile_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tile_types_id_seq OWNED BY tile_types.id;


--
-- Name: tiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tiles (
    id integer NOT NULL,
    name character varying,
    tile_type_id integer,
    sport_id integer,
    performer_id integer,
    venue_id integer,
    link character varying,
    slug character varying,
    has_geolocation boolean,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    image_file_name character varying,
    image_content_type character varying,
    image_file_size integer,
    image_updated_at timestamp without time zone,
    good_game_guarantee character varying,
    "position" integer,
    description character varying,
    url character varying
);


--
-- Name: tiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tiles_id_seq OWNED BY tiles.id;


--
-- Name: venues_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE venues_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: venues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE venues_id_seq OWNED BY venues.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY active_admin_comments ALTER COLUMN id SET DEFAULT nextval('active_admin_comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin_users ALTER COLUMN id SET DEFAULT nextval('admin_users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin_users_permissions ALTER COLUMN id SET DEFAULT nextval('admin_users_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY divisions ALTER COLUMN id SET DEFAULT nextval('divisions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY permissions ALTER COLUMN id SET DEFAULT nextval('permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY players ALTER COLUMN id SET DEFAULT nextval('players_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY promo_codes ALTER COLUMN id SET DEFAULT nextval('promo_codes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY refund_statuses ALTER COLUMN id SET DEFAULT nextval('refund_statuses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY service_fees ALTER COLUMN id SET DEFAULT nextval('service_fees_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY sports ALTER COLUMN id SET DEFAULT nextval('sports_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY testimonials ALTER COLUMN id SET DEFAULT nextval('testimonials_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tile_types ALTER COLUMN id SET DEFAULT nextval('tile_types_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tiles ALTER COLUMN id SET DEFAULT nextval('tiles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY venues ALTER COLUMN id SET DEFAULT nextval('venues_id_seq'::regclass);


--
-- Name: active_admin_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY active_admin_comments
    ADD CONSTRAINT active_admin_comments_pkey PRIMARY KEY (id);


--
-- Name: admin_access_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin_access
    ADD CONSTRAINT admin_access_pkey PRIMARY KEY (id);


--
-- Name: admin_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: admin_session_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin_session_data
    ADD CONSTRAINT admin_session_data_pkey PRIMARY KEY (sess_id);


--
-- Name: admin_users_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin_users_permissions
    ADD CONSTRAINT admin_users_permissions_pkey PRIMARY KEY (id);


--
-- Name: admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: divisions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY divisions
    ADD CONSTRAINT divisions_pkey PRIMARY KEY (id);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: order_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY order_stats
    ADD CONSTRAINT order_stats_pkey PRIMARY KEY (id);


--
-- Name: orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: players_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: promo_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY promo_codes
    ADD CONSTRAINT promo_codes_pkey PRIMARY KEY (id);


--
-- Name: refund_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY refund_statuses
    ADD CONSTRAINT refund_statuses_pkey PRIMARY KEY (id);


--
-- Name: service_fees_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY service_fees
    ADD CONSTRAINT service_fees_pkey PRIMARY KEY (id);


--
-- Name: session_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY session_data
    ADD CONSTRAINT session_data_pkey PRIMARY KEY (sess_id);


--
-- Name: sports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY sports
    ADD CONSTRAINT sports_pkey PRIMARY KEY (id);


--
-- Name: testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: tile_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tile_types
    ADD CONSTRAINT tile_types_pkey PRIMARY KEY (id);


--
-- Name: tiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tiles
    ADD CONSTRAINT tiles_pkey PRIMARY KEY (id);


--
-- Name: venues_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY venues
    ADD CONSTRAINT venues_pkey PRIMARY KEY (id);


--
-- Name: admin_access_admin_id_module_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX admin_access_admin_id_module_idx ON admin_access USING btree (admin_id, module);


--
-- Name: admin_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX admin_email_idx ON admin USING btree (email);


--
-- Name: admin_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX admin_username_idx ON admin USING btree (username);


--
-- Name: clients_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX clients_email_idx ON clients USING btree (email);


--
-- Name: events_te_performer_home_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_te_performer_home_id_idx ON events USING btree (te_performer_home_id);


--
-- Name: events_te_performer_visit_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_te_performer_visit_id_idx ON events USING btree (te_performer_visit_id);


--
-- Name: events_te_uid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX events_te_uid_idx ON events USING btree (te_uid);


--
-- Name: id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX id_index ON order_stats USING btree (id);


--
-- Name: index_active_admin_comments_on_author_type_and_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_admin_comments_on_author_type_and_author_id ON active_admin_comments USING btree (author_type, author_id);


--
-- Name: index_active_admin_comments_on_namespace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_admin_comments_on_namespace ON active_admin_comments USING btree (namespace);


--
-- Name: index_active_admin_comments_on_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_admin_comments_on_resource_type_and_resource_id ON active_admin_comments USING btree (resource_type, resource_id);


--
-- Name: index_admin_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_admin_users_on_email ON admin_users USING btree (email);


--
-- Name: index_admin_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_admin_users_on_reset_password_token ON admin_users USING btree (reset_password_token);


--
-- Name: index_admin_users_permissions_on_admin_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_admin_users_permissions_on_admin_user_id ON admin_users_permissions USING btree (admin_user_id);


--
-- Name: index_admin_users_permissions_on_permission_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_admin_users_permissions_on_permission_id ON admin_users_permissions USING btree (permission_id);


--
-- Name: index_clients_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_clients_on_email ON clients USING btree (email);


--
-- Name: index_clients_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_clients_on_reset_password_token ON clients USING btree (reset_password_token);


--
-- Name: index_divisions_on_division_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_divisions_on_division_id ON divisions USING btree (division_id);


--
-- Name: index_divisions_on_sport_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_divisions_on_sport_id ON divisions USING btree (sport_id);


--
-- Name: index_events_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_events_on_name ON events USING gin (to_tsvector('english'::regconfig, (name)::text));


--
-- Name: index_name_on_performer; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_name_on_performer ON performers USING gin (to_tsvector('english'::regconfig, (te_name)::text));


--
-- Name: index_name_on_performer_2; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_name_on_performer_2 ON performers USING gin (to_tsvector('english'::regconfig, (name)::text));


--
-- Name: index_performers_on_division_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_performers_on_division_id ON performers USING btree (division_id);


--
-- Name: index_performers_on_venue_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_performers_on_venue_id ON performers USING btree (venue_id);


--
-- Name: index_players_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_players_on_name ON players USING gin (to_tsvector('english'::regconfig, (name)::text));


--
-- Name: index_players_on_performer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_players_on_performer_id ON players USING btree (performer_id);


--
-- Name: index_tiles_on_performer_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tiles_on_performer_id ON tiles USING btree (performer_id);


--
-- Name: index_tiles_on_sport_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tiles_on_sport_id ON tiles USING btree (sport_id);


--
-- Name: index_tiles_on_tile_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tiles_on_tile_type_id ON tiles USING btree (tile_type_id);


--
-- Name: index_tiles_on_venue_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tiles_on_venue_id ON tiles USING btree (venue_id);


--
-- Name: index_venues_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_venues_on_name ON venues USING gin (to_tsvector('english'::regconfig, (name)::text));


--
-- Name: orders_te_order_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX orders_te_order_id_idx ON orders USING btree (te_order_id);


--
-- Name: performers_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX performers_id_idx ON performers USING btree (id);


--
-- Name: performers_te_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX performers_te_name_idx ON performers USING btree (te_name);


--
-- Name: performers_te_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX performers_te_slug_idx ON performers USING btree (te_slug);


--
-- Name: performers_te_uid_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX performers_te_uid_idx ON performers USING btree (te_uid);


--
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- Name: fk_rails_0cddd62772; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tiles
    ADD CONSTRAINT fk_rails_0cddd62772 FOREIGN KEY (sport_id) REFERENCES sports(id);


--
-- Name: fk_rails_281232f281; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tiles
    ADD CONSTRAINT fk_rails_281232f281 FOREIGN KEY (venue_id) REFERENCES venues(id);


--
-- Name: fk_rails_4c2799e181; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY divisions
    ADD CONSTRAINT fk_rails_4c2799e181 FOREIGN KEY (division_id) REFERENCES divisions(id);


--
-- Name: fk_rails_6c5200c157; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY players
    ADD CONSTRAINT fk_rails_6c5200c157 FOREIGN KEY (performer_id) REFERENCES performers(id);


--
-- Name: fk_rails_6fc39033ed; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tiles
    ADD CONSTRAINT fk_rails_6fc39033ed FOREIGN KEY (tile_type_id) REFERENCES tile_types(id);


--
-- Name: fk_rails_731637b68f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tiles
    ADD CONSTRAINT fk_rails_731637b68f FOREIGN KEY (performer_id) REFERENCES performers(id);


--
-- Name: fk_rails_8ccbe0c182; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT fk_rails_8ccbe0c182 FOREIGN KEY (refund_status_id) REFERENCES refund_statuses(id);


--
-- Name: fk_rails_a68983eab0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY performers
    ADD CONSTRAINT fk_rails_a68983eab0 FOREIGN KEY (division_id) REFERENCES divisions(id);


--
-- Name: fk_rails_aca11aede1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY performers
    ADD CONSTRAINT fk_rails_aca11aede1 FOREIGN KEY (venue_id) REFERENCES venues(id);


--
-- Name: fk_rails_d2d0be52f0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY testimonials
    ADD CONSTRAINT fk_rails_d2d0be52f0 FOREIGN KEY (performer_id) REFERENCES performers(id);


--
-- Name: fk_rails_d93e51e875; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY events
    ADD CONSTRAINT fk_rails_d93e51e875 FOREIGN KEY (sport_id) REFERENCES sports(id);


--
-- Name: fk_rails_dca24e4416; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY events
    ADD CONSTRAINT fk_rails_dca24e4416 FOREIGN KEY (home_performer_id) REFERENCES performers(id);


--
-- Name: fk_rails_df2f8d0f29; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY divisions
    ADD CONSTRAINT fk_rails_df2f8d0f29 FOREIGN KEY (sport_id) REFERENCES sports(id);


--
-- Name: fk_rails_e516da70f4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY performers
    ADD CONSTRAINT fk_rails_e516da70f4 FOREIGN KEY (sport_id) REFERENCES sports(id);


--
-- Name: fk_rails_ee419b37bb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY events
    ADD CONSTRAINT fk_rails_ee419b37bb FOREIGN KEY (away_performer_id) REFERENCES performers(id);


--
-- Name: fk_rails_f476266cf4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY events
    ADD CONSTRAINT fk_rails_f476266cf4 FOREIGN KEY (venue_id) REFERENCES venues(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO schema_migrations (version) VALUES ('20160705164621');

INSERT INTO schema_migrations (version) VALUES ('20160705164624');

INSERT INTO schema_migrations (version) VALUES ('20160705230639');

INSERT INTO schema_migrations (version) VALUES ('20160705231001');

INSERT INTO schema_migrations (version) VALUES ('20160705231027');

INSERT INTO schema_migrations (version) VALUES ('20160706175333');

INSERT INTO schema_migrations (version) VALUES ('20160708171454');

INSERT INTO schema_migrations (version) VALUES ('20160708200543');

INSERT INTO schema_migrations (version) VALUES ('20160708213449');

INSERT INTO schema_migrations (version) VALUES ('20160711210315');

INSERT INTO schema_migrations (version) VALUES ('20160712222347');

INSERT INTO schema_migrations (version) VALUES ('20160714212043');

INSERT INTO schema_migrations (version) VALUES ('20160715165713');

INSERT INTO schema_migrations (version) VALUES ('20160718194129');

INSERT INTO schema_migrations (version) VALUES ('20160719212107');

INSERT INTO schema_migrations (version) VALUES ('20160721170207');

INSERT INTO schema_migrations (version) VALUES ('20160721170249');

INSERT INTO schema_migrations (version) VALUES ('20160721202925');

INSERT INTO schema_migrations (version) VALUES ('20160721203236');

INSERT INTO schema_migrations (version) VALUES ('20160721203702');

INSERT INTO schema_migrations (version) VALUES ('20160726163519');

INSERT INTO schema_migrations (version) VALUES ('20160726163752');

INSERT INTO schema_migrations (version) VALUES ('20160726163756');

INSERT INTO schema_migrations (version) VALUES ('20160726182703');

INSERT INTO schema_migrations (version) VALUES ('20160726204209');

INSERT INTO schema_migrations (version) VALUES ('20160728233931');

INSERT INTO schema_migrations (version) VALUES ('20160729205636');

INSERT INTO schema_migrations (version) VALUES ('20160802201648');

INSERT INTO schema_migrations (version) VALUES ('20160802205440');

INSERT INTO schema_migrations (version) VALUES ('20160802215149');

INSERT INTO schema_migrations (version) VALUES ('20160802224927');

INSERT INTO schema_migrations (version) VALUES ('20160802225835');

INSERT INTO schema_migrations (version) VALUES ('20160802232011');

INSERT INTO schema_migrations (version) VALUES ('20160802233717');

INSERT INTO schema_migrations (version) VALUES ('20160802234201');

INSERT INTO schema_migrations (version) VALUES ('20160803213423');

INSERT INTO schema_migrations (version) VALUES ('20160804210655');

INSERT INTO schema_migrations (version) VALUES ('20160805000841');

INSERT INTO schema_migrations (version) VALUES ('20160808174617');

INSERT INTO schema_migrations (version) VALUES ('20160808203903');

INSERT INTO schema_migrations (version) VALUES ('20160808220850');

INSERT INTO schema_migrations (version) VALUES ('20160809155533');

INSERT INTO schema_migrations (version) VALUES ('20160809211945');

INSERT INTO schema_migrations (version) VALUES ('20160810234449');

INSERT INTO schema_migrations (version) VALUES ('20160812162815');

INSERT INTO schema_migrations (version) VALUES ('20160812232300');

INSERT INTO schema_migrations (version) VALUES ('20160817202446');

INSERT INTO schema_migrations (version) VALUES ('20160818181226');

INSERT INTO schema_migrations (version) VALUES ('20160823155443');

INSERT INTO schema_migrations (version) VALUES ('20160826163118');

INSERT INTO schema_migrations (version) VALUES ('20160826164454');

INSERT INTO schema_migrations (version) VALUES ('20160826165038');

INSERT INTO schema_migrations (version) VALUES ('20160826165853');

INSERT INTO schema_migrations (version) VALUES ('20160902001252');

