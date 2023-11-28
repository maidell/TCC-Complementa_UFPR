--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_table_access_method = heap;

--
-- Name: aluno; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.aluno (
    grr_aluno character varying(255),
    id_usuario bigint NOT NULL,
    id_graduacao bigint
);


--
-- Name: aluno_atividade; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.aluno_atividade (
    aluno_id bigint NOT NULL,
    atividade_id bigint NOT NULL
);


--
-- Name: anexo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.anexo (
    id bigint NOT NULL,
    file_name character varying(255),
    file_path character varying(255),
    atividade_id bigint NOT NULL,
    relatorio_de_conclusao bigint NOT NULL,
    file_type character varying(255)
);


--
-- Name: anexo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.anexo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: anexo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.anexo_id_seq OWNED BY public.anexo.id;


--
-- Name: atividade; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.atividade (
    id bigint NOT NULL,
    data_conclusao timestamp without time zone,
    data_contestacao timestamp without time zone,
    data_criacao timestamp without time zone,
    data_limite_candidatura timestamp without time zone,
    nome character varying(255),
    certificado_id character varying(255),
    competencia_id bigint,
    complexidade_id bigint,
    relatorio_de_conclusao bigint,
    id_usuario bigint,
    grr_aluno bigint,
    projeto_id bigint,
    fk_id_status integer,
    descricao character varying(255),
    id_executor bigint,
    contestacao_id bigint,
    contestacao_carga_horaria_id bigint
);


--
-- Name: atividade_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.atividade_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: atividade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.atividade_id_seq OWNED BY public.atividade.id;


--
-- Name: certificado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.certificado (
    id character varying(255) NOT NULL,
    hash character varying(255),
    horas double precision,
    nome character varying(255),
    orientador character varying(255),
    projeto character varying(255),
    salt character varying(255)
);


--
-- Name: comentario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comentario (
    id bigint NOT NULL,
    comentario character varying(255) NOT NULL,
    fk_id_atividade bigint,
    fk_id_usuario bigint
);


--
-- Name: competencia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.competencia (
    id_competencia bigint NOT NULL,
    nome_competencia character varying(255)
);


--
-- Name: complexidade; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.complexidade (
    id_complexidade bigint NOT NULL,
    carga_horaria_maxima integer,
    carga_horaria_minima integer,
    nome_complexidade character varying(255)
);


--
-- Name: contestacao; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contestacao (
    id bigint NOT NULL,
    descricao character varying(255),
    data_contestacao timestamp without time zone,
    status integer,
    tipo_contestacao integer,
    atividade_id bigint,
    id_usuario bigint
);


--
-- Name: contestacao_carga_horaria; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contestacao_carga_horaria (
    carga_horaria_nova double precision,
    carga_horaria_original double precision,
    id bigint NOT NULL
);


--
-- Name: contestacao_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contestacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contestacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contestacao_id_seq OWNED BY public.contestacao.id;


--
-- Name: graduacao; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.graduacao (
    id bigint NOT NULL,
    nome character varying(255),
    coordenador_id_usuario bigint
);


--
-- Name: graduacao_atividades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.graduacao_atividades (
    graduacoes_id bigint NOT NULL,
    atividades_id bigint NOT NULL
);


--
-- Name: graduacao_competencias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.graduacao_competencias (
    graduacao_id bigint NOT NULL,
    competencias_id_competencia bigint NOT NULL
);


--
-- Name: graduacao_complexidades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.graduacao_complexidades (
    graduacao_id bigint NOT NULL,
    complexidades_id_complexidade bigint NOT NULL
);


--
-- Name: graduacao_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.graduacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: graduacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.graduacao_id_seq OWNED BY public.graduacao.id;


--
-- Name: graduacao_servidores_coordenadores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.graduacao_servidores_coordenadores (
    graduacao_id bigint NOT NULL,
    servidores_coordenadores_id_usuario bigint NOT NULL
);


--
-- Name: orientador; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orientador (
    id_usuario bigint NOT NULL,
    id_graduacao bigint
);


--
-- Name: papel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.papel (
    valor integer NOT NULL
);


--
-- Name: projeto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projeto (
    id_projeto bigint NOT NULL,
    descricao_projeto character varying(255),
    nome_projeto character varying(255),
    id_orientador bigint,
    objetivo_geral_projeto character varying(255),
    objetivos_especificos_projeto character varying(255),
    tipo integer
);


--
-- Name: projeto_aluno; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projeto_aluno (
    id_projeto bigint NOT NULL,
    id_aluno bigint NOT NULL
);


--
-- Name: projeto_monitor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projeto_monitor (
    id_projeto bigint NOT NULL,
    id_monitor bigint NOT NULL
);


--
-- Name: relatorio_de_conclusao; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.relatorio_de_conclusao (
    id bigint NOT NULL,
    descricao character varying(255)
);


--
-- Name: relatorio_de_conclusao_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.relatorio_de_conclusao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: relatorio_de_conclusao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.relatorio_de_conclusao_id_seq OWNED BY public.relatorio_de_conclusao.id;


--
-- Name: servidor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.servidor (
    matricula_servidor character varying(255),
    id_usuario bigint NOT NULL
);


--
-- Name: status; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.status (
    valor integer NOT NULL
);


--
-- Name: tb_comentario_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tb_comentario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tb_comentario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tb_comentario_id_seq OWNED BY public.comentario.id;


--
-- Name: tb_competencias_id_competencia_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tb_competencias_id_competencia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tb_competencias_id_competencia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tb_competencias_id_competencia_seq OWNED BY public.competencia.id_competencia;


--
-- Name: tb_complexidades_id_complexidade_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tb_complexidades_id_complexidade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tb_complexidades_id_complexidade_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tb_complexidades_id_complexidade_seq OWNED BY public.complexidade.id_complexidade;


--
-- Name: tb_projeto_id_projeto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tb_projeto_id_projeto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tb_projeto_id_projeto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tb_projeto_id_projeto_seq OWNED BY public.projeto.id_projeto;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuario (
    id_usuario bigint NOT NULL,
    email character varying(255),
    nome character varying(255),
    fk_id_papel character varying(255),
    senha character varying(255),
    telefone character varying(255),
    salt character varying(255),
    ativo boolean
);


--
-- Name: tb_usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tb_usuarios_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tb_usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tb_usuarios_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- Name: tipo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipo (
    valor integer NOT NULL
);


--
-- Name: tipo_contestacao; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipo_contestacao (
    valor integer NOT NULL
);


--
-- Name: anexo id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anexo ALTER COLUMN id SET DEFAULT nextval('public.anexo_id_seq'::regclass);


--
-- Name: atividade id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade ALTER COLUMN id SET DEFAULT nextval('public.atividade_id_seq'::regclass);


--
-- Name: comentario id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comentario ALTER COLUMN id SET DEFAULT nextval('public.tb_comentario_id_seq'::regclass);


--
-- Name: competencia id_competencia; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.competencia ALTER COLUMN id_competencia SET DEFAULT nextval('public.tb_competencias_id_competencia_seq'::regclass);


--
-- Name: complexidade id_complexidade; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complexidade ALTER COLUMN id_complexidade SET DEFAULT nextval('public.tb_complexidades_id_complexidade_seq'::regclass);


--
-- Name: contestacao id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contestacao ALTER COLUMN id SET DEFAULT nextval('public.contestacao_id_seq'::regclass);


--
-- Name: graduacao id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao ALTER COLUMN id SET DEFAULT nextval('public.graduacao_id_seq'::regclass);


--
-- Name: projeto id_projeto; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto ALTER COLUMN id_projeto SET DEFAULT nextval('public.tb_projeto_id_projeto_seq'::regclass);


--
-- Name: relatorio_de_conclusao id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.relatorio_de_conclusao ALTER COLUMN id SET DEFAULT nextval('public.relatorio_de_conclusao_id_seq'::regclass);


--
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.tb_usuarios_id_usuario_seq'::regclass);


--
-- Data for Name: aluno; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20232401', 3, NULL);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20230001', 6, 6);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20230003', 5, 6);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20196040', 32, 6);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20205945', 42, 10);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20209785', 44, 3);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20230457', 50, 11);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20210002', 1, 6);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20197483', 4, 12);
INSERT INTO public.aluno (grr_aluno, id_usuario, id_graduacao) VALUES ('20237458', 51, 6);


--
-- Data for Name: aluno_atividade; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: anexo; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.anexo (id, file_name, file_path, atividade_id, relatorio_de_conclusao, file_type) VALUES (11, NULL, 'src\main\resources\binaries\3x4_ce.png', 1, 1, 'image/png');
INSERT INTO public.anexo (id, file_name, file_path, atividade_id, relatorio_de_conclusao, file_type) VALUES (12, NULL, 'src\main\resources\binaries\Atividade 1 - APS2.pdf', 1, 1, 'application/pdf');


--
-- Data for Name: atividade; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.atividade (id, data_conclusao, data_contestacao, data_criacao, data_limite_candidatura, nome, certificado_id, competencia_id, complexidade_id, relatorio_de_conclusao, id_usuario, grr_aluno, projeto_id, fk_id_status, descricao, id_executor, contestacao_id, contestacao_carga_horaria_id) VALUES (1, NULL, NULL, '2023-10-26 21:00:00', '2023-10-27 21:00:00', 'Teste', NULL, 13, 1, NULL, 1, NULL, 1, 1, 'Descrição de atividade Teste', 4, NULL, NULL);


--
-- Data for Name: certificado; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: comentario; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) VALUES (1, 'Primeiro comentario de teste', 1, 6);
INSERT INTO public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) VALUES (2, 'Segundo comentario de teste', 1, 5);
INSERT INTO public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) VALUES (3, 'Terceiro comentario de teste', 1, 6);
INSERT INTO public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) VALUES (4, 'Quarto comentario de teste', 1, 5);
INSERT INTO public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) VALUES (5, 'Quinto comentario de teste', 1, 6);
INSERT INTO public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) VALUES (6, 'Sexto comentario de teste', 1, 5);


--
-- Data for Name: competencia; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (4, 'Volutariado');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (3, 'FullStack');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (5, 'Nova Competência');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (6, 'teste');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (7, 'testando');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (8, 'Mais um');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (1, 'Consultorias');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (9, 'testa');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (10, 'eee');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (11, 'asdasdasd');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (13, 'Auxílio');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (15, 'farofa');
INSERT INTO public.competencia (id_competencia, nome_competencia) VALUES (2, 'Desenvolvimentos');


--
-- Data for Name: complexidade; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) VALUES (1, 10, 6, 'Média');
INSERT INTO public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) VALUES (3, 0, 0, 'Baixa');
INSERT INTO public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) VALUES (4, 0, 0, 'Baixa');
INSERT INTO public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) VALUES (5, 0, 0, 'Alta');
INSERT INTO public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) VALUES (2, 5, 1, 'Baixa');
INSERT INTO public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) VALUES (6, 15, 11, 'Altíssima');


--
-- Data for Name: contestacao; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: contestacao_carga_horaria; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: graduacao; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (1, 'Administração', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (2, 'Administração Pública', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (3, 'Agente Comunitário de Saúde', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (4, 'Agroecologia', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (5, 'Agronomia', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (7, 'Arquitetura e Urbanismo', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (8, 'Artes', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (9, 'Artes Visuais', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (10, 'Biomedicina', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (11, 'Ciência da Computação', NULL);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (12, 'Ciências', 48);
INSERT INTO public.graduacao (id, nome, coordenador_id_usuario) VALUES (6, 'Análise e Desenvolvimento de Sistemas', 41);


--
-- Data for Name: graduacao_atividades; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: graduacao_competencias; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.graduacao_competencias (graduacao_id, competencias_id_competencia) VALUES (6, 1);
INSERT INTO public.graduacao_competencias (graduacao_id, competencias_id_competencia) VALUES (6, 13);
INSERT INTO public.graduacao_competencias (graduacao_id, competencias_id_competencia) VALUES (6, 2);
INSERT INTO public.graduacao_competencias (graduacao_id, competencias_id_competencia) VALUES (12, 4);
INSERT INTO public.graduacao_competencias (graduacao_id, competencias_id_competencia) VALUES (12, 1);


--
-- Data for Name: graduacao_complexidades; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.graduacao_complexidades (graduacao_id, complexidades_id_complexidade) VALUES (6, 1);
INSERT INTO public.graduacao_complexidades (graduacao_id, complexidades_id_complexidade) VALUES (6, 2);
INSERT INTO public.graduacao_complexidades (graduacao_id, complexidades_id_complexidade) VALUES (6, 6);


--
-- Data for Name: graduacao_servidores_coordenadores; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) VALUES (12, 35);
INSERT INTO public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) VALUES (12, 37);
INSERT INTO public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) VALUES (12, 40);
INSERT INTO public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) VALUES (6, 35);
INSERT INTO public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) VALUES (6, 38);


--
-- Data for Name: orientador; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orientador (id_usuario, id_graduacao) VALUES (48, 12);
INSERT INTO public.orientador (id_usuario, id_graduacao) VALUES (41, 6);
INSERT INTO public.orientador (id_usuario, id_graduacao) VALUES (49, 6);


--
-- Data for Name: papel; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: projeto; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.projeto (id_projeto, descricao_projeto, nome_projeto, id_orientador, objetivo_geral_projeto, objetivos_especificos_projeto, tipo) VALUES (1, 'Descrição do Projeto de TCC', 'Projeto de TCC', 49, 'Me formar', 'Não morrer', NULL);


--
-- Data for Name: projeto_aluno; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.projeto_aluno (id_projeto, id_aluno) VALUES (1, 6);


--
-- Data for Name: projeto_monitor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.projeto_monitor (id_projeto, id_monitor) VALUES (1, 5);


--
-- Data for Name: relatorio_de_conclusao; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.relatorio_de_conclusao (id, descricao) VALUES (1, 'dull');


--
-- Data for Name: servidor; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('12345678', 35);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('78945612', 37);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('77889966', 38);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('66554411', 39);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('77777777', 40);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('89785645', 41);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('78946346', 48);
INSERT INTO public.servidor (matricula_servidor, id_usuario) VALUES ('78945678', 49);


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: tipo; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: tipo_contestacao; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (48, 'maria.lemos@ufpr.br', 'Maria Lemos', '4', 'iCT2Ph2fAEv659iPOpCaS1G9ug4Vx5smfFwGI/DXBtY=', '41988745813', 'gAJcEq83Is++oMdzwXehOw==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (32, 'lukas.guibor@ufpr.br', 'Lukas Guibor dos Santos Costa', '0', '+s66z7S3ftZNrLH9am7BPTseFuaxaY7ZrnPqPIRjBaw=', '41996506432', 'oDWE+JBsJylMzcHeCyT/7w==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (34, 'judite.pereira@ufpr.br', 'Judite Pereira', '6', 'eYtTXo2iegqMKlDDmxtFko5ohYoyVO0tjAQRsR2e/nQ=', '41989418941', 'tBSUzQlsJQobuuaCyLmVwQ==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (2, 'administrador@ufpr.br', 'Administrador', '6', 'rgE/yOTXsLpApBSzfZwnrw8bomqqluGF3G1pVHX5t8A=', '(41)99999-9999', 'test', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (3, 'emanuelle.guibor@ufpr.br', 'Emanuelle Guibor Costa', '0', 'rgE/yOTXsLpApBSzfZwnrw8bomqqluGF3G1pVHX5t8A=', '41997150659', 'test', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (33, 'amancio.lopes@ufpr.br', 'Amancio Lopes', '6', 'aovwDu9W2syTHuz7hc4fuAT+O+a/qTS0gJvOY8H0GG8=', '41941414141', '6XWw8+imMICimyzxu7ICjA==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (35, 'andreia.vasquez@ufpr.br', 'Andréia Vasquez', '1', '1mbfAme5tMaeywVL1DByu5IYx6sFoPHnJr4gZKV+q98=', '41988998899', 'pkM+5DHLE2MUNib2nmM1Qw==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (37, 'ana.paula.silva@ufpr.br', 'Ana Paula Silva', '1', 'pBFC0elgavqUNlOnLIdxTQy1jDYwm1Lg8P7dg13qaQc=', '44989898888', 'aL0Z43QD7onuK63dJ/R+bw==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (38, 'leandro.vaz@ufpr.br', 'Leandro Vaz', '1', 'BD8j9vUaK5p41A6z6da5g4Vx7gZJjSPAl4MRqnIwnng=', '42999998888', '8YC35KEScqxXoyzJCP65kA==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (39, 'leticia.junqueira@ufpr.br', 'Letícia Junqueira', '1', 'H4h8W3YVsr/PnoO6TFjMMhpC3hTynRfkRq4mx3m+mxQ=', '31987708949', '388lBBI3R+gj/UGz88Mydg==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (40, 'luis.alves@ufpr.br', 'Luis Alves', '1', '8ZBXLvOoG5rICduoN+7JxrdRT2LVZQNkvRLTmrI3jzA=', '88984455591', 'HgEjd0LT3mrkPBfpYefiWA==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (42, 'isaque.sales@ufpr.br', 'Isaque Sales', '0', 'BP4zYpAcW7+P0UPRL5Fi3zV2NK5rEYekOlRrLqbK7Q8=', '21998845614', 'iWqDXjfqHrBYQl+U4vc5Ww==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (50, 'josealmeida@ufpr.br', 'Jose Almeida', '0', 'ATUyaFPxZrTj+YHjtIZA7tHwH7CvsFG4BTvoPPMa30c=', '41987568945', '+LeUgqbN7usljS76j0OWsg==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (6, 'jonildo.alves@ufpr.br', 'Jonildo Alves', '0', NULL, '(41)98989-8989', NULL, false);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (5, 'joao.silva@ufpr.br', 'João Silva', '0', NULL, '41988888888', NULL, false);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (4, 'schlipake@ufpr.br', 'Luiz Felipe Schilipake', '0', 'Yt+wng/AkfBc61LAaExZKHLluvtJmEgp4Tyt2VuuKNg=', '41999999999', 'test', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (1, 'maria.dores@ufpr.br', 'Maria das Dores', '0', 'kAPVjQcXsUseVvVuxSn9zxlRoyZ/MPSI/z3yyOC7S9c=', '41987919831', 'test', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (41, 'julia.costa@ufpr.br', 'Julia Costa', '4', 'iCT2Ph2fAEv659iPOpCaS1G9ug4Vx5smfFwGI/DXBtY=', '51966699669', 'gAJcEq83Is++oMdzwXehOw==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (51, 'jose.henrique@ufpr.br', 'José Henrique', '0', 'ZpoLi/HHxVxfMqAfSYLfY+AI4XZzqZKCA8xeZOfHi+U=', '41987456610', 'oLccBJ4RiULcMJ26ClgN2w==', false);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (44, 'amanda.matos@ufpr.br', 'Amanda Matos', '0', 'YeSygs2NDTKUg25l5m91FMpFUlVZNg+NNGHn3dojdSI=', '41998746234', 'D1uhTE3/Bv4xE+YAuNT40w==', true);
INSERT INTO public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) VALUES (49, 'leonardo.soares@ufpr.br', 'Leonardo Augusto Soares', '4', 'fa5kqFVBDz4kGv1n1E506CQ6F2sBZZUjyWFPGDObrTk=', '41987456321', 'opd1AvjvIZyQUUUduxET4Q==', true);


--
-- Name: anexo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.anexo_id_seq', 12, true);


--
-- Name: atividade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.atividade_id_seq', 1, true);


--
-- Name: contestacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contestacao_id_seq', 1, false);


--
-- Name: graduacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.graduacao_id_seq', 12, true);


--
-- Name: relatorio_de_conclusao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.relatorio_de_conclusao_id_seq', 1, true);


--
-- Name: tb_comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tb_comentario_id_seq', 6, true);


--
-- Name: tb_competencias_id_competencia_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tb_competencias_id_competencia_seq', 15, true);


--
-- Name: tb_complexidades_id_complexidade_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tb_complexidades_id_complexidade_seq', 6, true);


--
-- Name: tb_projeto_id_projeto_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tb_projeto_id_projeto_seq', 1, true);


--
-- Name: tb_usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tb_usuarios_id_usuario_seq', 51, true);


--
-- Name: atividade atividade_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT atividade_pkey PRIMARY KEY (id);


--
-- Name: certificado certificado_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT certificado_pkey PRIMARY KEY (id);


--
-- Name: contestacao_carga_horaria contestacao_carga_horaria_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contestacao_carga_horaria
    ADD CONSTRAINT contestacao_carga_horaria_pkey PRIMARY KEY (id);


--
-- Name: contestacao contestacao_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT contestacao_pkey PRIMARY KEY (id);


--
-- Name: graduacao graduacao_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao
    ADD CONSTRAINT graduacao_pkey PRIMARY KEY (id);


--
-- Name: papel papel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.papel
    ADD CONSTRAINT papel_pkey PRIMARY KEY (valor);


--
-- Name: relatorio_de_conclusao relatorio_de_conclusao_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.relatorio_de_conclusao
    ADD CONSTRAINT relatorio_de_conclusao_pkey PRIMARY KEY (id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (valor);


--
-- Name: aluno tb_alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT tb_alunos_pkey PRIMARY KEY (id_usuario);


--
-- Name: comentario tb_comentario_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT tb_comentario_pkey PRIMARY KEY (id);


--
-- Name: competencia tb_competencias_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.competencia
    ADD CONSTRAINT tb_competencias_pkey PRIMARY KEY (id_competencia);


--
-- Name: complexidade tb_complexidades_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.complexidade
    ADD CONSTRAINT tb_complexidades_pkey PRIMARY KEY (id_complexidade);


--
-- Name: orientador tb_orientadores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT tb_orientadores_pkey PRIMARY KEY (id_usuario);


--
-- Name: projeto tb_projeto_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT tb_projeto_pkey PRIMARY KEY (id_projeto);


--
-- Name: servidor tb_servidores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.servidor
    ADD CONSTRAINT tb_servidores_pkey PRIMARY KEY (id_usuario);


--
-- Name: usuario tb_usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: tipo_contestacao tipo_contestacao_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_contestacao
    ADD CONSTRAINT tipo_contestacao_pkey PRIMARY KEY (valor);


--
-- Name: tipo tipo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo
    ADD CONSTRAINT tipo_pkey PRIMARY KEY (valor);


--
-- Name: certificado uk18he35y0ix2egperetqtkdnb3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT uk18he35y0ix2egperetqtkdnb3 UNIQUE (hash);


--
-- Name: usuario uk5171l57faosmj8myawaucatdw; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk5171l57faosmj8myawaucatdw UNIQUE (email);


--
-- Name: usuario uk5l3eo4wgf5hc00e186feu3ywc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk5l3eo4wgf5hc00e186feu3ywc UNIQUE (email);


--
-- Name: graduacao_complexidades uk_tmjfma7iqxcrf5hyx3k10hvgv; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT uk_tmjfma7iqxcrf5hyx3k10hvgv UNIQUE (complexidades_id_complexidade);


--
-- Name: aluno ukj9d7ya9vcnd5lxeso6igkdk3a; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT ukj9d7ya9vcnd5lxeso6igkdk3a UNIQUE (grr_aluno);


--
-- Name: projeto_aluno fk17dgpd91ueh89scukd7a47g8d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto_aluno
    ADD CONSTRAINT fk17dgpd91ueh89scukd7a47g8d FOREIGN KEY (id_projeto) REFERENCES public.projeto(id_projeto);


--
-- Name: projeto fk2k48208orfnmk68vseetkrt06; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk2k48208orfnmk68vseetkrt06 FOREIGN KEY (id_orientador) REFERENCES public.orientador(id_usuario);


--
-- Name: contestacao fk3be6h4x7khm0y2fq0w4r5iay; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT fk3be6h4x7khm0y2fq0w4r5iay FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: comentario fk3brdmku7v5uyvkut6ma36bynr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk3brdmku7v5uyvkut6ma36bynr FOREIGN KEY (fk_id_atividade) REFERENCES public.atividade(id);


--
-- Name: graduacao_competencias fk3rtva3lrjuj2gyxjyp060tf91; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_competencias
    ADD CONSTRAINT fk3rtva3lrjuj2gyxjyp060tf91 FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);


--
-- Name: aluno fk48gp4ibss40wqt4leuwvsujo6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk48gp4ibss40wqt4leuwvsujo6 FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: atividade fk4fymruei0saful2pmrr7vr0pr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk4fymruei0saful2pmrr7vr0pr FOREIGN KEY (contestacao_id) REFERENCES public.contestacao(id);


--
-- Name: orientador fk72jl3ly42mrskl0qdhjoty6gj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT fk72jl3ly42mrskl0qdhjoty6gj FOREIGN KEY (id_usuario) REFERENCES public.servidor(id_usuario);


--
-- Name: servidor fk75670hk65c3ttu76q4d1db0j6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.servidor
    ADD CONSTRAINT fk75670hk65c3ttu76q4d1db0j6 FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: atividade fk85lpu1qb8j0f0pub04kn9b1i0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk85lpu1qb8j0f0pub04kn9b1i0 FOREIGN KEY (id_executor) REFERENCES public.aluno(id_usuario);


--
-- Name: aluno fk8j2xbiwa13ayr82qoext4wept; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk8j2xbiwa13ayr82qoext4wept FOREIGN KEY (id_graduacao) REFERENCES public.graduacao(id);


--
-- Name: atividade fk9e22n65hw8xgymjlcwan1gml; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk9e22n65hw8xgymjlcwan1gml FOREIGN KEY (id_executor) REFERENCES public.usuario(id_usuario);


--
-- Name: atividade fk9jn9cjxi1bd1s5s8vg4p8ai0d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk9jn9cjxi1bd1s5s8vg4p8ai0d FOREIGN KEY (relatorio_de_conclusao) REFERENCES public.relatorio_de_conclusao(id);


--
-- Name: anexo fkafsy6qk0s0y10imfs53dprtsa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anexo
    ADD CONSTRAINT fkafsy6qk0s0y10imfs53dprtsa FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);


--
-- Name: graduacao_complexidades fkd8q2kiqdaa613kt62huh41j93; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT fkd8q2kiqdaa613kt62huh41j93 FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);


--
-- Name: aluno_atividade fkd9dy714t2ld7ogoqr3kfvsdkh; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aluno_atividade
    ADD CONSTRAINT fkd9dy714t2ld7ogoqr3kfvsdkh FOREIGN KEY (aluno_id) REFERENCES public.aluno(id_usuario);


--
-- Name: graduacao_atividades fkg3sa8e5wptanublukgyk5vcjq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_atividades
    ADD CONSTRAINT fkg3sa8e5wptanublukgyk5vcjq FOREIGN KEY (atividades_id) REFERENCES public.atividade(id);


--
-- Name: contestacao_carga_horaria fkg8qabbi38nd344iqf7sldnqeu; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contestacao_carga_horaria
    ADD CONSTRAINT fkg8qabbi38nd344iqf7sldnqeu FOREIGN KEY (id) REFERENCES public.contestacao(id);


--
-- Name: atividade fkj1dno4qi2ilm5ye77mwsbgi5j; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkj1dno4qi2ilm5ye77mwsbgi5j FOREIGN KEY (contestacao_carga_horaria_id) REFERENCES public.contestacao_carga_horaria(id);


--
-- Name: atividade fkj73rny8fum5x4ymaym8hcv293; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkj73rny8fum5x4ymaym8hcv293 FOREIGN KEY (competencia_id) REFERENCES public.competencia(id_competencia);


--
-- Name: projeto_monitor fkj9rp5x3j51dv48ssm0fv7ji8a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto_monitor
    ADD CONSTRAINT fkj9rp5x3j51dv48ssm0fv7ji8a FOREIGN KEY (id_monitor) REFERENCES public.aluno(id_usuario);


--
-- Name: graduacao_servidores_coordenadores fkji91gr3lpdv3wsjjjnaqb449l; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_servidores_coordenadores
    ADD CONSTRAINT fkji91gr3lpdv3wsjjjnaqb449l FOREIGN KEY (servidores_coordenadores_id_usuario) REFERENCES public.servidor(id_usuario);


--
-- Name: graduacao_atividades fkjws7wufoegkmw69ghcnq83kqi; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_atividades
    ADD CONSTRAINT fkjws7wufoegkmw69ghcnq83kqi FOREIGN KEY (graduacoes_id) REFERENCES public.graduacao(id);


--
-- Name: projeto_aluno fkkre1e780dye8pq1hfeg4pgg8r; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto_aluno
    ADD CONSTRAINT fkkre1e780dye8pq1hfeg4pgg8r FOREIGN KEY (id_aluno) REFERENCES public.aluno(id_usuario);


--
-- Name: atividade fkl2xkjgwm0v3pkbh413imbw2x3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkl2xkjgwm0v3pkbh413imbw2x3 FOREIGN KEY (projeto_id) REFERENCES public.projeto(id_projeto);


--
-- Name: graduacao_complexidades fklnwwy62x249ryhku2puhxqivj; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT fklnwwy62x249ryhku2puhxqivj FOREIGN KEY (complexidades_id_complexidade) REFERENCES public.complexidade(id_complexidade);


--
-- Name: atividade fkltgpfutf26k4jhfe0gk006bnb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkltgpfutf26k4jhfe0gk006bnb FOREIGN KEY (certificado_id) REFERENCES public.certificado(id);


--
-- Name: anexo fkmtqbj5tjodshyjnvu0cqrvdrn; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.anexo
    ADD CONSTRAINT fkmtqbj5tjodshyjnvu0cqrvdrn FOREIGN KEY (relatorio_de_conclusao) REFERENCES public.relatorio_de_conclusao(id);


--
-- Name: aluno_atividade fkmu32rpk7o5uxob8erjw5ferr2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.aluno_atividade
    ADD CONSTRAINT fkmu32rpk7o5uxob8erjw5ferr2 FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);


--
-- Name: projeto_monitor fkn2je2sh9a95axp3d9h9ufgwtq; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projeto_monitor
    ADD CONSTRAINT fkn2je2sh9a95axp3d9h9ufgwtq FOREIGN KEY (id_projeto) REFERENCES public.projeto(id_projeto);


--
-- Name: graduacao_servidores_coordenadores fknf6h2y114aufnax95lxkk936k; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_servidores_coordenadores
    ADD CONSTRAINT fknf6h2y114aufnax95lxkk936k FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);


--
-- Name: atividade fknlevm692u469x5f76dxh7bmr; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fknlevm692u469x5f76dxh7bmr FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: graduacao fknvkuypi6ixinoorao880aj7mp; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao
    ADD CONSTRAINT fknvkuypi6ixinoorao880aj7mp FOREIGN KEY (coordenador_id_usuario) REFERENCES public.orientador(id_usuario);


--
-- Name: orientador fko92sd8nhfnr0vr760pwtyrnqx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT fko92sd8nhfnr0vr760pwtyrnqx FOREIGN KEY (id_graduacao) REFERENCES public.graduacao(id);


--
-- Name: comentario fkqiquv464d2mulgvt9jc9mnwp5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fkqiquv464d2mulgvt9jc9mnwp5 FOREIGN KEY (fk_id_usuario) REFERENCES public.usuario(id_usuario);


--
-- Name: graduacao_competencias fksuibbv3n0c8tc02jta8vpf8t1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.graduacao_competencias
    ADD CONSTRAINT fksuibbv3n0c8tc02jta8vpf8t1 FOREIGN KEY (competencias_id_competencia) REFERENCES public.competencia(id_competencia);


--
-- Name: atividade fkt62rjv68mvfg5918dod354v2m; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkt62rjv68mvfg5918dod354v2m FOREIGN KEY (complexidade_id) REFERENCES public.complexidade(id_complexidade);


--
-- PostgreSQL database dump complete
--

