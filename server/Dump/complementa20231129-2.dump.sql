PGDMP     4                
    {            postgres    15.1 (Debian 15.1-1.pgdg110+1)    15.1 �               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    5    postgres    DATABASE     s   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3590            �            1259    16388    aluno    TABLE     }   CREATE TABLE public.aluno (
    grr_aluno character varying(255),
    id_usuario bigint NOT NULL,
    id_graduacao bigint
);
    DROP TABLE public.aluno;
       public         heap    postgres    false            �            1259    16391    aluno_atividade    TABLE     h   CREATE TABLE public.aluno_atividade (
    aluno_id bigint NOT NULL,
    atividade_id bigint NOT NULL
);
 #   DROP TABLE public.aluno_atividade;
       public         heap    postgres    false            �            1259    16813    anexo    TABLE     �   CREATE TABLE public.anexo (
    id bigint NOT NULL,
    file_name character varying(255),
    file_path character varying(255),
    file_type character varying(255)
);
    DROP TABLE public.anexo;
       public         heap    postgres    false            �            1259    16812    anexo_id_seq    SEQUENCE     u   CREATE SEQUENCE public.anexo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.anexo_id_seq;
       public          postgres    false    250                       0    0    anexo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.anexo_id_seq OWNED BY public.anexo.id;
          public          postgres    false    249            �            1259    16821    anexos_atividades    TABLE     [   CREATE TABLE public.anexos_atividades (
    atividade_id bigint,
    id bigint NOT NULL
);
 %   DROP TABLE public.anexos_atividades;
       public         heap    postgres    false            �            1259    16826    anexos_relatorio    TABLE     �   CREATE TABLE public.anexos_relatorio (
    relatorio_id bigint,
    anexos_id bigint NOT NULL,
    atividade_id bigint NOT NULL
);
 $   DROP TABLE public.anexos_relatorio;
       public         heap    postgres    false            �            1259    16400 	   atividade    TABLE     A  CREATE TABLE public.atividade (
    id bigint NOT NULL,
    data_conclusao timestamp without time zone,
    data_criacao timestamp without time zone,
    data_limite_candidatura timestamp without time zone,
    nome character varying(255),
    certificado_id character varying(255),
    competencia_id bigint,
    complexidade_id bigint,
    relatorio_de_conclusao bigint,
    id_usuario bigint,
    projeto_id bigint,
    fk_id_status integer,
    descricao character varying(255),
    id_executor bigint,
    contestacao_id bigint,
    contestacao_carga_horaria_id bigint
);
    DROP TABLE public.atividade;
       public         heap    postgres    false            �            1259    16405    atividade_id_seq    SEQUENCE     y   CREATE SEQUENCE public.atividade_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.atividade_id_seq;
       public          postgres    false    216            	           0    0    atividade_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.atividade_id_seq OWNED BY public.atividade.id;
          public          postgres    false    217            �            1259    16406    certificado    TABLE       CREATE TABLE public.certificado (
    id character varying(255) NOT NULL,
    hash character varying(255),
    horas double precision,
    nome character varying(255),
    orientador character varying(255),
    projeto character varying(255),
    salt character varying(255)
);
    DROP TABLE public.certificado;
       public         heap    postgres    false            �            1259    16411 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id bigint NOT NULL,
    comentario character varying(255) NOT NULL,
    fk_id_atividade bigint,
    fk_id_usuario bigint
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    16414    competencia    TABLE     u   CREATE TABLE public.competencia (
    id_competencia bigint NOT NULL,
    nome_competencia character varying(255)
);
    DROP TABLE public.competencia;
       public         heap    postgres    false            �            1259    16417    complexidade    TABLE     �   CREATE TABLE public.complexidade (
    id_complexidade bigint NOT NULL,
    carga_horaria_maxima integer,
    carga_horaria_minima integer,
    nome_complexidade character varying(255)
);
     DROP TABLE public.complexidade;
       public         heap    postgres    false            �            1259    16420    contestacao    TABLE     �   CREATE TABLE public.contestacao (
    id bigint NOT NULL,
    descricao character varying(255),
    data_contestacao timestamp without time zone,
    status integer,
    tipo_contestacao integer,
    atividade_id bigint,
    id_usuario bigint
);
    DROP TABLE public.contestacao;
       public         heap    postgres    false            �            1259    16423    contestacao_carga_horaria    TABLE     �   CREATE TABLE public.contestacao_carga_horaria (
    carga_horaria_nova double precision,
    carga_horaria_original double precision,
    id bigint NOT NULL
);
 -   DROP TABLE public.contestacao_carga_horaria;
       public         heap    postgres    false            �            1259    16426    contestacao_id_seq    SEQUENCE     {   CREATE SEQUENCE public.contestacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.contestacao_id_seq;
       public          postgres    false    222            
           0    0    contestacao_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.contestacao_id_seq OWNED BY public.contestacao.id;
          public          postgres    false    224            �            1259    16427 	   graduacao    TABLE     ~   CREATE TABLE public.graduacao (
    id bigint NOT NULL,
    nome character varying(255),
    coordenador_id_usuario bigint
);
    DROP TABLE public.graduacao;
       public         heap    postgres    false            �            1259    16430    graduacao_atividades    TABLE     �   CREATE TABLE public.graduacao_atividades (
    graduacoes_id bigint NOT NULL,
    atividades_id bigint NOT NULL,
    graduacao_id bigint NOT NULL
);
 (   DROP TABLE public.graduacao_atividades;
       public         heap    postgres    false            �            1259    16433    graduacao_competencias    TABLE     �   CREATE TABLE public.graduacao_competencias (
    graduacao_id bigint NOT NULL,
    competencias_id_competencia bigint NOT NULL
);
 *   DROP TABLE public.graduacao_competencias;
       public         heap    postgres    false            �            1259    16436    graduacao_complexidades    TABLE     �   CREATE TABLE public.graduacao_complexidades (
    graduacao_id bigint NOT NULL,
    complexidades_id_complexidade bigint NOT NULL
);
 +   DROP TABLE public.graduacao_complexidades;
       public         heap    postgres    false            �            1259    16439    graduacao_id_seq    SEQUENCE     y   CREATE SEQUENCE public.graduacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.graduacao_id_seq;
       public          postgres    false    225                       0    0    graduacao_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.graduacao_id_seq OWNED BY public.graduacao.id;
          public          postgres    false    229            �            1259    16440 "   graduacao_servidores_coordenadores    TABLE     �   CREATE TABLE public.graduacao_servidores_coordenadores (
    graduacao_id bigint NOT NULL,
    servidores_coordenadores_id_usuario bigint NOT NULL
);
 6   DROP TABLE public.graduacao_servidores_coordenadores;
       public         heap    postgres    false            �            1259    16748    graduacoes_atividades    TABLE     t   CREATE TABLE public.graduacoes_atividades (
    atividades_id bigint NOT NULL,
    graduacoes_id bigint NOT NULL
);
 )   DROP TABLE public.graduacoes_atividades;
       public         heap    postgres    false            �            1259    16443 
   orientador    TABLE     \   CREATE TABLE public.orientador (
    id_usuario bigint NOT NULL,
    id_graduacao bigint
);
    DROP TABLE public.orientador;
       public         heap    postgres    false            �            1259    16446    papel    TABLE     :   CREATE TABLE public.papel (
    valor integer NOT NULL
);
    DROP TABLE public.papel;
       public         heap    postgres    false            �            1259    16449    projeto    TABLE     0  CREATE TABLE public.projeto (
    id_projeto bigint NOT NULL,
    descricao_projeto character varying(255),
    nome_projeto character varying(255),
    id_orientador bigint,
    objetivo_geral_projeto character varying(255),
    objetivos_especificos_projeto character varying(255),
    tipo integer
);
    DROP TABLE public.projeto;
       public         heap    postgres    false            �            1259    16454    projeto_aluno    TABLE     d   CREATE TABLE public.projeto_aluno (
    id_projeto bigint NOT NULL,
    id_aluno bigint NOT NULL
);
 !   DROP TABLE public.projeto_aluno;
       public         heap    postgres    false            �            1259    16457    projeto_monitor    TABLE     h   CREATE TABLE public.projeto_monitor (
    id_projeto bigint NOT NULL,
    id_monitor bigint NOT NULL
);
 #   DROP TABLE public.projeto_monitor;
       public         heap    postgres    false            �            1259    16460    relatorio_de_conclusao    TABLE     m   CREATE TABLE public.relatorio_de_conclusao (
    id bigint NOT NULL,
    descricao character varying(255)
);
 *   DROP TABLE public.relatorio_de_conclusao;
       public         heap    postgres    false            �            1259    16463    relatorio_de_conclusao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relatorio_de_conclusao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.relatorio_de_conclusao_id_seq;
       public          postgres    false    236                       0    0    relatorio_de_conclusao_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.relatorio_de_conclusao_id_seq OWNED BY public.relatorio_de_conclusao.id;
          public          postgres    false    237            �            1259    16464    servidor    TABLE     p   CREATE TABLE public.servidor (
    matricula_servidor character varying(255),
    id_usuario bigint NOT NULL
);
    DROP TABLE public.servidor;
       public         heap    postgres    false            �            1259    16467    status    TABLE     ;   CREATE TABLE public.status (
    valor integer NOT NULL
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    16470    tb_comentario_id_seq    SEQUENCE     }   CREATE SEQUENCE public.tb_comentario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.tb_comentario_id_seq;
       public          postgres    false    219                       0    0    tb_comentario_id_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.tb_comentario_id_seq OWNED BY public.comentario.id;
          public          postgres    false    240            �            1259    16471 "   tb_competencias_id_competencia_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_competencias_id_competencia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tb_competencias_id_competencia_seq;
       public          postgres    false    220                       0    0 "   tb_competencias_id_competencia_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.tb_competencias_id_competencia_seq OWNED BY public.competencia.id_competencia;
          public          postgres    false    241            �            1259    16472 $   tb_complexidades_id_complexidade_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_complexidades_id_complexidade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.tb_complexidades_id_complexidade_seq;
       public          postgres    false    221                       0    0 $   tb_complexidades_id_complexidade_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tb_complexidades_id_complexidade_seq OWNED BY public.complexidade.id_complexidade;
          public          postgres    false    242            �            1259    16473    tb_projeto_id_projeto_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_projeto_id_projeto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.tb_projeto_id_projeto_seq;
       public          postgres    false    233                       0    0    tb_projeto_id_projeto_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public.tb_projeto_id_projeto_seq OWNED BY public.projeto.id_projeto;
          public          postgres    false    243            �            1259    16474    usuario    TABLE     &  CREATE TABLE public.usuario (
    id_usuario bigint NOT NULL,
    email character varying(255),
    nome character varying(255),
    fk_id_papel character varying(255),
    senha character varying(255),
    telefone character varying(255),
    salt character varying(255),
    ativo boolean
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16479    tb_usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_usuarios_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tb_usuarios_id_usuario_seq;
       public          postgres    false    244                       0    0    tb_usuarios_id_usuario_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.tb_usuarios_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    245            �            1259    16480    tipo    TABLE     9   CREATE TABLE public.tipo (
    valor integer NOT NULL
);
    DROP TABLE public.tipo;
       public         heap    postgres    false            �            1259    16483    tipo_contestacao    TABLE     E   CREATE TABLE public.tipo_contestacao (
    valor integer NOT NULL
);
 $   DROP TABLE public.tipo_contestacao;
       public         heap    postgres    false            �           2604    16816    anexo id    DEFAULT     d   ALTER TABLE ONLY public.anexo ALTER COLUMN id SET DEFAULT nextval('public.anexo_id_seq'::regclass);
 7   ALTER TABLE public.anexo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249    250            �           2604    16487    atividade id    DEFAULT     l   ALTER TABLE ONLY public.atividade ALTER COLUMN id SET DEFAULT nextval('public.atividade_id_seq'::regclass);
 ;   ALTER TABLE public.atividade ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    16488    comentario id    DEFAULT     q   ALTER TABLE ONLY public.comentario ALTER COLUMN id SET DEFAULT nextval('public.tb_comentario_id_seq'::regclass);
 <   ALTER TABLE public.comentario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    240    219            �           2604    16489    competencia id_competencia    DEFAULT     �   ALTER TABLE ONLY public.competencia ALTER COLUMN id_competencia SET DEFAULT nextval('public.tb_competencias_id_competencia_seq'::regclass);
 I   ALTER TABLE public.competencia ALTER COLUMN id_competencia DROP DEFAULT;
       public          postgres    false    241    220            �           2604    16490    complexidade id_complexidade    DEFAULT     �   ALTER TABLE ONLY public.complexidade ALTER COLUMN id_complexidade SET DEFAULT nextval('public.tb_complexidades_id_complexidade_seq'::regclass);
 K   ALTER TABLE public.complexidade ALTER COLUMN id_complexidade DROP DEFAULT;
       public          postgres    false    242    221            �           2604    16491    contestacao id    DEFAULT     p   ALTER TABLE ONLY public.contestacao ALTER COLUMN id SET DEFAULT nextval('public.contestacao_id_seq'::regclass);
 =   ALTER TABLE public.contestacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    222            �           2604    16492    graduacao id    DEFAULT     l   ALTER TABLE ONLY public.graduacao ALTER COLUMN id SET DEFAULT nextval('public.graduacao_id_seq'::regclass);
 ;   ALTER TABLE public.graduacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    225            �           2604    16493    projeto id_projeto    DEFAULT     {   ALTER TABLE ONLY public.projeto ALTER COLUMN id_projeto SET DEFAULT nextval('public.tb_projeto_id_projeto_seq'::regclass);
 A   ALTER TABLE public.projeto ALTER COLUMN id_projeto DROP DEFAULT;
       public          postgres    false    243    233            �           2604    16494    relatorio_de_conclusao id    DEFAULT     �   ALTER TABLE ONLY public.relatorio_de_conclusao ALTER COLUMN id SET DEFAULT nextval('public.relatorio_de_conclusao_id_seq'::regclass);
 H   ALTER TABLE public.relatorio_de_conclusao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236            �           2604    16495    usuario id_usuario    DEFAULT     |   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.tb_usuarios_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    245    244            �          0    16388    aluno 
   TABLE DATA           D   COPY public.aluno (grr_aluno, id_usuario, id_graduacao) FROM stdin;
    public          postgres    false    214   h�       �          0    16391    aluno_atividade 
   TABLE DATA           A   COPY public.aluno_atividade (aluno_id, atividade_id) FROM stdin;
    public          postgres    false    215   ��       �          0    16813    anexo 
   TABLE DATA           D   COPY public.anexo (id, file_name, file_path, file_type) FROM stdin;
    public          postgres    false    250   ��       �          0    16821    anexos_atividades 
   TABLE DATA           =   COPY public.anexos_atividades (atividade_id, id) FROM stdin;
    public          postgres    false    251   �                  0    16826    anexos_relatorio 
   TABLE DATA           Q   COPY public.anexos_relatorio (relatorio_id, anexos_id, atividade_id) FROM stdin;
    public          postgres    false    252   /�       �          0    16400 	   atividade 
   TABLE DATA             COPY public.atividade (id, data_conclusao, data_criacao, data_limite_candidatura, nome, certificado_id, competencia_id, complexidade_id, relatorio_de_conclusao, id_usuario, projeto_id, fk_id_status, descricao, id_executor, contestacao_id, contestacao_carga_horaria_id) FROM stdin;
    public          postgres    false    216   L�       �          0    16406    certificado 
   TABLE DATA           W   COPY public.certificado (id, hash, horas, nome, orientador, projeto, salt) FROM stdin;
    public          postgres    false    218   1�       �          0    16411 
   comentario 
   TABLE DATA           T   COPY public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) FROM stdin;
    public          postgres    false    219   N�       �          0    16414    competencia 
   TABLE DATA           G   COPY public.competencia (id_competencia, nome_competencia) FROM stdin;
    public          postgres    false    220   ��       �          0    16417    complexidade 
   TABLE DATA           v   COPY public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) FROM stdin;
    public          postgres    false    221   ��       �          0    16420    contestacao 
   TABLE DATA           z   COPY public.contestacao (id, descricao, data_contestacao, status, tipo_contestacao, atividade_id, id_usuario) FROM stdin;
    public          postgres    false    222   ��       �          0    16423    contestacao_carga_horaria 
   TABLE DATA           c   COPY public.contestacao_carga_horaria (carga_horaria_nova, carga_horaria_original, id) FROM stdin;
    public          postgres    false    223   l�       �          0    16427 	   graduacao 
   TABLE DATA           E   COPY public.graduacao (id, nome, coordenador_id_usuario) FROM stdin;
    public          postgres    false    225   ��       �          0    16430    graduacao_atividades 
   TABLE DATA           Z   COPY public.graduacao_atividades (graduacoes_id, atividades_id, graduacao_id) FROM stdin;
    public          postgres    false    226   k�       �          0    16433    graduacao_competencias 
   TABLE DATA           [   COPY public.graduacao_competencias (graduacao_id, competencias_id_competencia) FROM stdin;
    public          postgres    false    227   ��       �          0    16436    graduacao_complexidades 
   TABLE DATA           ^   COPY public.graduacao_complexidades (graduacao_id, complexidades_id_complexidade) FROM stdin;
    public          postgres    false    228   ��       �          0    16440 "   graduacao_servidores_coordenadores 
   TABLE DATA           o   COPY public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) FROM stdin;
    public          postgres    false    230   ��       �          0    16748    graduacoes_atividades 
   TABLE DATA           M   COPY public.graduacoes_atividades (atividades_id, graduacoes_id) FROM stdin;
    public          postgres    false    248   �       �          0    16443 
   orientador 
   TABLE DATA           >   COPY public.orientador (id_usuario, id_graduacao) FROM stdin;
    public          postgres    false    231   4�       �          0    16446    papel 
   TABLE DATA           &   COPY public.papel (valor) FROM stdin;
    public          postgres    false    232   e�       �          0    16449    projeto 
   TABLE DATA           �   COPY public.projeto (id_projeto, descricao_projeto, nome_projeto, id_orientador, objetivo_geral_projeto, objetivos_especificos_projeto, tipo) FROM stdin;
    public          postgres    false    233   ��       �          0    16454    projeto_aluno 
   TABLE DATA           =   COPY public.projeto_aluno (id_projeto, id_aluno) FROM stdin;
    public          postgres    false    234   ��       �          0    16457    projeto_monitor 
   TABLE DATA           A   COPY public.projeto_monitor (id_projeto, id_monitor) FROM stdin;
    public          postgres    false    235   �       �          0    16460    relatorio_de_conclusao 
   TABLE DATA           ?   COPY public.relatorio_de_conclusao (id, descricao) FROM stdin;
    public          postgres    false    236   '�       �          0    16464    servidor 
   TABLE DATA           B   COPY public.servidor (matricula_servidor, id_usuario) FROM stdin;
    public          postgres    false    238   ��       �          0    16467    status 
   TABLE DATA           '   COPY public.status (valor) FROM stdin;
    public          postgres    false    239   2�       �          0    16480    tipo 
   TABLE DATA           %   COPY public.tipo (valor) FROM stdin;
    public          postgres    false    246   O�       �          0    16483    tipo_contestacao 
   TABLE DATA           1   COPY public.tipo_contestacao (valor) FROM stdin;
    public          postgres    false    247   l�       �          0    16474    usuario 
   TABLE DATA           e   COPY public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) FROM stdin;
    public          postgres    false    244   ��                  0    0    anexo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.anexo_id_seq', 1, false);
          public          postgres    false    249                       0    0    atividade_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.atividade_id_seq', 16, true);
          public          postgres    false    217                       0    0    contestacao_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.contestacao_id_seq', 4, true);
          public          postgres    false    224                       0    0    graduacao_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.graduacao_id_seq', 12, true);
          public          postgres    false    229                       0    0    relatorio_de_conclusao_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.relatorio_de_conclusao_id_seq', 9, true);
          public          postgres    false    237                       0    0    tb_comentario_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.tb_comentario_id_seq', 10, true);
          public          postgres    false    240                       0    0 "   tb_competencias_id_competencia_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.tb_competencias_id_competencia_seq', 15, true);
          public          postgres    false    241                       0    0 $   tb_complexidades_id_complexidade_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.tb_complexidades_id_complexidade_seq', 6, true);
          public          postgres    false    242                       0    0    tb_projeto_id_projeto_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.tb_projeto_id_projeto_seq', 3, true);
          public          postgres    false    243                       0    0    tb_usuarios_id_usuario_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.tb_usuarios_id_usuario_seq', 52, true);
          public          postgres    false    245                       2606    16820    anexo anexo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.anexo
    ADD CONSTRAINT anexo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.anexo DROP CONSTRAINT anexo_pkey;
       public            postgres    false    250                       2606    16825 (   anexos_atividades anexos_atividades_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.anexos_atividades
    ADD CONSTRAINT anexos_atividades_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.anexos_atividades DROP CONSTRAINT anexos_atividades_pkey;
       public            postgres    false    251                        2606    16830 &   anexos_relatorio anexos_relatorio_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.anexos_relatorio
    ADD CONSTRAINT anexos_relatorio_pkey PRIMARY KEY (anexos_id);
 P   ALTER TABLE ONLY public.anexos_relatorio DROP CONSTRAINT anexos_relatorio_pkey;
       public            postgres    false    252            �           2606    16497    atividade atividade_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT atividade_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.atividade DROP CONSTRAINT atividade_pkey;
       public            postgres    false    216            �           2606    16499    certificado certificado_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT certificado_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.certificado DROP CONSTRAINT certificado_pkey;
       public            postgres    false    218                        2606    16501 8   contestacao_carga_horaria contestacao_carga_horaria_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.contestacao_carga_horaria
    ADD CONSTRAINT contestacao_carga_horaria_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.contestacao_carga_horaria DROP CONSTRAINT contestacao_carga_horaria_pkey;
       public            postgres    false    223            �           2606    16503    contestacao contestacao_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT contestacao_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.contestacao DROP CONSTRAINT contestacao_pkey;
       public            postgres    false    222                       2606    16505    graduacao graduacao_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.graduacao
    ADD CONSTRAINT graduacao_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.graduacao DROP CONSTRAINT graduacao_pkey;
       public            postgres    false    225                       2606    16507    papel papel_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.papel
    ADD CONSTRAINT papel_pkey PRIMARY KEY (valor);
 :   ALTER TABLE ONLY public.papel DROP CONSTRAINT papel_pkey;
       public            postgres    false    232                       2606    16509 2   relatorio_de_conclusao relatorio_de_conclusao_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.relatorio_de_conclusao
    ADD CONSTRAINT relatorio_de_conclusao_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.relatorio_de_conclusao DROP CONSTRAINT relatorio_de_conclusao_pkey;
       public            postgres    false    236                       2606    16511    status status_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (valor);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    239            �           2606    16513    aluno tb_alunos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT tb_alunos_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.aluno DROP CONSTRAINT tb_alunos_pkey;
       public            postgres    false    214            �           2606    16515    comentario tb_comentario_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT tb_comentario_pkey PRIMARY KEY (id);
 G   ALTER TABLE ONLY public.comentario DROP CONSTRAINT tb_comentario_pkey;
       public            postgres    false    219            �           2606    16517     competencia tb_competencias_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.competencia
    ADD CONSTRAINT tb_competencias_pkey PRIMARY KEY (id_competencia);
 J   ALTER TABLE ONLY public.competencia DROP CONSTRAINT tb_competencias_pkey;
       public            postgres    false    220            �           2606    16519 "   complexidade tb_complexidades_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.complexidade
    ADD CONSTRAINT tb_complexidades_pkey PRIMARY KEY (id_complexidade);
 L   ALTER TABLE ONLY public.complexidade DROP CONSTRAINT tb_complexidades_pkey;
       public            postgres    false    221                       2606    16521    orientador tb_orientadores_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT tb_orientadores_pkey PRIMARY KEY (id_usuario);
 I   ALTER TABLE ONLY public.orientador DROP CONSTRAINT tb_orientadores_pkey;
       public            postgres    false    231            
           2606    16523    projeto tb_projeto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT tb_projeto_pkey PRIMARY KEY (id_projeto);
 A   ALTER TABLE ONLY public.projeto DROP CONSTRAINT tb_projeto_pkey;
       public            postgres    false    233                       2606    16525    servidor tb_servidores_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.servidor
    ADD CONSTRAINT tb_servidores_pkey PRIMARY KEY (id_usuario);
 E   ALTER TABLE ONLY public.servidor DROP CONSTRAINT tb_servidores_pkey;
       public            postgres    false    238                       2606    16527    usuario tb_usuarios_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id_usuario);
 B   ALTER TABLE ONLY public.usuario DROP CONSTRAINT tb_usuarios_pkey;
       public            postgres    false    244                       2606    16529 &   tipo_contestacao tipo_contestacao_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.tipo_contestacao
    ADD CONSTRAINT tipo_contestacao_pkey PRIMARY KEY (valor);
 P   ALTER TABLE ONLY public.tipo_contestacao DROP CONSTRAINT tipo_contestacao_pkey;
       public            postgres    false    247                       2606    16531    tipo tipo_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.tipo
    ADD CONSTRAINT tipo_pkey PRIMARY KEY (valor);
 8   ALTER TABLE ONLY public.tipo DROP CONSTRAINT tipo_pkey;
       public            postgres    false    246            �           2606    16533 '   certificado uk18he35y0ix2egperetqtkdnb3 
   CONSTRAINT     b   ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT uk18he35y0ix2egperetqtkdnb3 UNIQUE (hash);
 Q   ALTER TABLE ONLY public.certificado DROP CONSTRAINT uk18he35y0ix2egperetqtkdnb3;
       public            postgres    false    218                       2606    16535 #   usuario uk5171l57faosmj8myawaucatdw 
   CONSTRAINT     _   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk5171l57faosmj8myawaucatdw UNIQUE (email);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT uk5171l57faosmj8myawaucatdw;
       public            postgres    false    244                       2606    16537 #   usuario uk5l3eo4wgf5hc00e186feu3ywc 
   CONSTRAINT     _   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk5l3eo4wgf5hc00e186feu3ywc UNIQUE (email);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT uk5l3eo4wgf5hc00e186feu3ywc;
       public            postgres    false    244            �           2606    16794 ,   aluno_atividade uk_lb6pu4isigqxf97edahhurnud 
   CONSTRAINT     k   ALTER TABLE ONLY public.aluno_atividade
    ADD CONSTRAINT uk_lb6pu4isigqxf97edahhurnud UNIQUE (aluno_id);
 V   ALTER TABLE ONLY public.aluno_atividade DROP CONSTRAINT uk_lb6pu4isigqxf97edahhurnud;
       public            postgres    false    215                       2606    16539 4   graduacao_complexidades uk_tmjfma7iqxcrf5hyx3k10hvgv 
   CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT uk_tmjfma7iqxcrf5hyx3k10hvgv UNIQUE (complexidades_id_complexidade);
 ^   ALTER TABLE ONLY public.graduacao_complexidades DROP CONSTRAINT uk_tmjfma7iqxcrf5hyx3k10hvgv;
       public            postgres    false    228            �           2606    16541 !   aluno ukj9d7ya9vcnd5lxeso6igkdk3a 
   CONSTRAINT     a   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT ukj9d7ya9vcnd5lxeso6igkdk3a UNIQUE (grr_aluno);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT ukj9d7ya9vcnd5lxeso6igkdk3a;
       public            postgres    false    214            @           2606    16542 )   projeto_aluno fk17dgpd91ueh89scukd7a47g8d    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_aluno
    ADD CONSTRAINT fk17dgpd91ueh89scukd7a47g8d FOREIGN KEY (id_projeto) REFERENCES public.projeto(id_projeto);
 S   ALTER TABLE ONLY public.projeto_aluno DROP CONSTRAINT fk17dgpd91ueh89scukd7a47g8d;
       public          postgres    false    234    3338    233            I           2606    16843 ,   anexos_relatorio fk1e83vxf0ka15f9glxu7kfsua7    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexos_relatorio
    ADD CONSTRAINT fk1e83vxf0ka15f9glxu7kfsua7 FOREIGN KEY (relatorio_id) REFERENCES public.relatorio_de_conclusao(id);
 V   ALTER TABLE ONLY public.anexos_relatorio DROP CONSTRAINT fk1e83vxf0ka15f9glxu7kfsua7;
       public          postgres    false    3340    252    236            ?           2606    16547 #   projeto fk2k48208orfnmk68vseetkrt06    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk2k48208orfnmk68vseetkrt06 FOREIGN KEY (id_orientador) REFERENCES public.orientador(id_usuario);
 M   ALTER TABLE ONLY public.projeto DROP CONSTRAINT fk2k48208orfnmk68vseetkrt06;
       public          postgres    false    231    3334    233            1           2606    16552 &   contestacao fk3be6h4x7khm0y2fq0w4r5iay    FK CONSTRAINT     �   ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT fk3be6h4x7khm0y2fq0w4r5iay FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 P   ALTER TABLE ONLY public.contestacao DROP CONSTRAINT fk3be6h4x7khm0y2fq0w4r5iay;
       public          postgres    false    3346    222    244            /           2606    16557 &   comentario fk3brdmku7v5uyvkut6ma36bynr    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk3brdmku7v5uyvkut6ma36bynr FOREIGN KEY (fk_id_atividade) REFERENCES public.atividade(id);
 P   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk3brdmku7v5uyvkut6ma36bynr;
       public          postgres    false    216    219    3314            7           2606    16562 2   graduacao_competencias fk3rtva3lrjuj2gyxjyp060tf91    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_competencias
    ADD CONSTRAINT fk3rtva3lrjuj2gyxjyp060tf91 FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 \   ALTER TABLE ONLY public.graduacao_competencias DROP CONSTRAINT fk3rtva3lrjuj2gyxjyp060tf91;
       public          postgres    false    227    225    3330            !           2606    16567 !   aluno fk48gp4ibss40wqt4leuwvsujo6    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk48gp4ibss40wqt4leuwvsujo6 FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fk48gp4ibss40wqt4leuwvsujo6;
       public          postgres    false    214    244    3346            %           2606    16572 %   atividade fk4fymruei0saful2pmrr7vr0pr    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk4fymruei0saful2pmrr7vr0pr FOREIGN KEY (contestacao_id) REFERENCES public.contestacao(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk4fymruei0saful2pmrr7vr0pr;
       public          postgres    false    3326    222    216            G           2606    16838 -   anexos_atividades fk65p8x5ipxj2e0tdy6vipxiy0k    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexos_atividades
    ADD CONSTRAINT fk65p8x5ipxj2e0tdy6vipxiy0k FOREIGN KEY (id) REFERENCES public.anexo(id);
 W   ALTER TABLE ONLY public.anexos_atividades DROP CONSTRAINT fk65p8x5ipxj2e0tdy6vipxiy0k;
       public          postgres    false    251    250    3356            4           2606    16753 0   graduacao_atividades fk6xxds1iv15rk7hsocqe716q3h    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_atividades
    ADD CONSTRAINT fk6xxds1iv15rk7hsocqe716q3h FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 Z   ALTER TABLE ONLY public.graduacao_atividades DROP CONSTRAINT fk6xxds1iv15rk7hsocqe716q3h;
       public          postgres    false    3330    226    225            =           2606    16577 &   orientador fk72jl3ly42mrskl0qdhjoty6gj    FK CONSTRAINT     �   ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT fk72jl3ly42mrskl0qdhjoty6gj FOREIGN KEY (id_usuario) REFERENCES public.servidor(id_usuario);
 P   ALTER TABLE ONLY public.orientador DROP CONSTRAINT fk72jl3ly42mrskl0qdhjoty6gj;
       public          postgres    false    3342    238    231            D           2606    16582 $   servidor fk75670hk65c3ttu76q4d1db0j6    FK CONSTRAINT     �   ALTER TABLE ONLY public.servidor
    ADD CONSTRAINT fk75670hk65c3ttu76q4d1db0j6 FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 N   ALTER TABLE ONLY public.servidor DROP CONSTRAINT fk75670hk65c3ttu76q4d1db0j6;
       public          postgres    false    244    238    3346            &           2606    16587 %   atividade fk85lpu1qb8j0f0pub04kn9b1i0    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk85lpu1qb8j0f0pub04kn9b1i0 FOREIGN KEY (id_executor) REFERENCES public.aluno(id_usuario);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk85lpu1qb8j0f0pub04kn9b1i0;
       public          postgres    false    3308    214    216            "           2606    16592 !   aluno fk8j2xbiwa13ayr82qoext4wept    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk8j2xbiwa13ayr82qoext4wept FOREIGN KEY (id_graduacao) REFERENCES public.graduacao(id);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fk8j2xbiwa13ayr82qoext4wept;
       public          postgres    false    3330    214    225            E           2606    16758 1   graduacoes_atividades fk98im6e0eaaai8lel6bm3809ud    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacoes_atividades
    ADD CONSTRAINT fk98im6e0eaaai8lel6bm3809ud FOREIGN KEY (graduacoes_id) REFERENCES public.graduacao(id);
 [   ALTER TABLE ONLY public.graduacoes_atividades DROP CONSTRAINT fk98im6e0eaaai8lel6bm3809ud;
       public          postgres    false    3330    225    248            '           2606    16597 $   atividade fk9e22n65hw8xgymjlcwan1gml    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk9e22n65hw8xgymjlcwan1gml FOREIGN KEY (id_executor) REFERENCES public.usuario(id_usuario);
 N   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk9e22n65hw8xgymjlcwan1gml;
       public          postgres    false    244    3346    216            (           2606    16602 %   atividade fk9jn9cjxi1bd1s5s8vg4p8ai0d    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk9jn9cjxi1bd1s5s8vg4p8ai0d FOREIGN KEY (relatorio_de_conclusao) REFERENCES public.relatorio_de_conclusao(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk9jn9cjxi1bd1s5s8vg4p8ai0d;
       public          postgres    false    236    3340    216            J           2606    16853 ,   anexos_relatorio fkan76a9fdrqetlqskf0msl5ou3    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexos_relatorio
    ADD CONSTRAINT fkan76a9fdrqetlqskf0msl5ou3 FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);
 V   ALTER TABLE ONLY public.anexos_relatorio DROP CONSTRAINT fkan76a9fdrqetlqskf0msl5ou3;
       public          postgres    false    216    3314    252            9           2606    16612 3   graduacao_complexidades fkd8q2kiqdaa613kt62huh41j93    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT fkd8q2kiqdaa613kt62huh41j93 FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 ]   ALTER TABLE ONLY public.graduacao_complexidades DROP CONSTRAINT fkd8q2kiqdaa613kt62huh41j93;
       public          postgres    false    225    3330    228            #           2606    16617 +   aluno_atividade fkd9dy714t2ld7ogoqr3kfvsdkh    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno_atividade
    ADD CONSTRAINT fkd9dy714t2ld7ogoqr3kfvsdkh FOREIGN KEY (aluno_id) REFERENCES public.aluno(id_usuario);
 U   ALTER TABLE ONLY public.aluno_atividade DROP CONSTRAINT fkd9dy714t2ld7ogoqr3kfvsdkh;
       public          postgres    false    214    3308    215            K           2606    16848 ,   anexos_relatorio fkf72kw9m7c740r4xjtp57x3vip    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexos_relatorio
    ADD CONSTRAINT fkf72kw9m7c740r4xjtp57x3vip FOREIGN KEY (anexos_id) REFERENCES public.anexo(id);
 V   ALTER TABLE ONLY public.anexos_relatorio DROP CONSTRAINT fkf72kw9m7c740r4xjtp57x3vip;
       public          postgres    false    250    3356    252            5           2606    16622 0   graduacao_atividades fkg3sa8e5wptanublukgyk5vcjq    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_atividades
    ADD CONSTRAINT fkg3sa8e5wptanublukgyk5vcjq FOREIGN KEY (atividades_id) REFERENCES public.atividade(id);
 Z   ALTER TABLE ONLY public.graduacao_atividades DROP CONSTRAINT fkg3sa8e5wptanublukgyk5vcjq;
       public          postgres    false    3314    216    226            2           2606    16627 5   contestacao_carga_horaria fkg8qabbi38nd344iqf7sldnqeu    FK CONSTRAINT     �   ALTER TABLE ONLY public.contestacao_carga_horaria
    ADD CONSTRAINT fkg8qabbi38nd344iqf7sldnqeu FOREIGN KEY (id) REFERENCES public.contestacao(id);
 _   ALTER TABLE ONLY public.contestacao_carga_horaria DROP CONSTRAINT fkg8qabbi38nd344iqf7sldnqeu;
       public          postgres    false    223    3326    222            )           2606    16632 %   atividade fkj1dno4qi2ilm5ye77mwsbgi5j    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkj1dno4qi2ilm5ye77mwsbgi5j FOREIGN KEY (contestacao_carga_horaria_id) REFERENCES public.contestacao_carga_horaria(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkj1dno4qi2ilm5ye77mwsbgi5j;
       public          postgres    false    216    3328    223            *           2606    16637 %   atividade fkj73rny8fum5x4ymaym8hcv293    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkj73rny8fum5x4ymaym8hcv293 FOREIGN KEY (competencia_id) REFERENCES public.competencia(id_competencia);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkj73rny8fum5x4ymaym8hcv293;
       public          postgres    false    216    3322    220            B           2606    16642 +   projeto_monitor fkj9rp5x3j51dv48ssm0fv7ji8a    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_monitor
    ADD CONSTRAINT fkj9rp5x3j51dv48ssm0fv7ji8a FOREIGN KEY (id_monitor) REFERENCES public.aluno(id_usuario);
 U   ALTER TABLE ONLY public.projeto_monitor DROP CONSTRAINT fkj9rp5x3j51dv48ssm0fv7ji8a;
       public          postgres    false    3308    235    214            ;           2606    16647 >   graduacao_servidores_coordenadores fkji91gr3lpdv3wsjjjnaqb449l    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_servidores_coordenadores
    ADD CONSTRAINT fkji91gr3lpdv3wsjjjnaqb449l FOREIGN KEY (servidores_coordenadores_id_usuario) REFERENCES public.servidor(id_usuario);
 h   ALTER TABLE ONLY public.graduacao_servidores_coordenadores DROP CONSTRAINT fkji91gr3lpdv3wsjjjnaqb449l;
       public          postgres    false    230    3342    238            6           2606    16652 0   graduacao_atividades fkjws7wufoegkmw69ghcnq83kqi    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_atividades
    ADD CONSTRAINT fkjws7wufoegkmw69ghcnq83kqi FOREIGN KEY (graduacoes_id) REFERENCES public.graduacao(id);
 Z   ALTER TABLE ONLY public.graduacao_atividades DROP CONSTRAINT fkjws7wufoegkmw69ghcnq83kqi;
       public          postgres    false    226    3330    225            A           2606    16657 )   projeto_aluno fkkre1e780dye8pq1hfeg4pgg8r    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_aluno
    ADD CONSTRAINT fkkre1e780dye8pq1hfeg4pgg8r FOREIGN KEY (id_aluno) REFERENCES public.aluno(id_usuario);
 S   ALTER TABLE ONLY public.projeto_aluno DROP CONSTRAINT fkkre1e780dye8pq1hfeg4pgg8r;
       public          postgres    false    234    3308    214            +           2606    16662 %   atividade fkl2xkjgwm0v3pkbh413imbw2x3    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkl2xkjgwm0v3pkbh413imbw2x3 FOREIGN KEY (projeto_id) REFERENCES public.projeto(id_projeto);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkl2xkjgwm0v3pkbh413imbw2x3;
       public          postgres    false    216    3338    233            H           2606    16833 -   anexos_atividades fklcx7t3geek0fllyukavkdwtcb    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexos_atividades
    ADD CONSTRAINT fklcx7t3geek0fllyukavkdwtcb FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);
 W   ALTER TABLE ONLY public.anexos_atividades DROP CONSTRAINT fklcx7t3geek0fllyukavkdwtcb;
       public          postgres    false    216    3314    251            :           2606    16667 3   graduacao_complexidades fklnwwy62x249ryhku2puhxqivj    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT fklnwwy62x249ryhku2puhxqivj FOREIGN KEY (complexidades_id_complexidade) REFERENCES public.complexidade(id_complexidade);
 ]   ALTER TABLE ONLY public.graduacao_complexidades DROP CONSTRAINT fklnwwy62x249ryhku2puhxqivj;
       public          postgres    false    3324    228    221            ,           2606    16672 %   atividade fkltgpfutf26k4jhfe0gk006bnb    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkltgpfutf26k4jhfe0gk006bnb FOREIGN KEY (certificado_id) REFERENCES public.certificado(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkltgpfutf26k4jhfe0gk006bnb;
       public          postgres    false    216    3316    218            $           2606    16682 +   aluno_atividade fkmu32rpk7o5uxob8erjw5ferr2    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno_atividade
    ADD CONSTRAINT fkmu32rpk7o5uxob8erjw5ferr2 FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);
 U   ALTER TABLE ONLY public.aluno_atividade DROP CONSTRAINT fkmu32rpk7o5uxob8erjw5ferr2;
       public          postgres    false    215    3314    216            C           2606    16687 +   projeto_monitor fkn2je2sh9a95axp3d9h9ufgwtq    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_monitor
    ADD CONSTRAINT fkn2je2sh9a95axp3d9h9ufgwtq FOREIGN KEY (id_projeto) REFERENCES public.projeto(id_projeto);
 U   ALTER TABLE ONLY public.projeto_monitor DROP CONSTRAINT fkn2je2sh9a95axp3d9h9ufgwtq;
       public          postgres    false    235    3338    233            <           2606    16692 >   graduacao_servidores_coordenadores fknf6h2y114aufnax95lxkk936k    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_servidores_coordenadores
    ADD CONSTRAINT fknf6h2y114aufnax95lxkk936k FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 h   ALTER TABLE ONLY public.graduacao_servidores_coordenadores DROP CONSTRAINT fknf6h2y114aufnax95lxkk936k;
       public          postgres    false    230    3330    225            -           2606    16697 $   atividade fknlevm692u469x5f76dxh7bmr    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fknlevm692u469x5f76dxh7bmr FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 N   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fknlevm692u469x5f76dxh7bmr;
       public          postgres    false    216    3346    244            3           2606    16702 %   graduacao fknvkuypi6ixinoorao880aj7mp    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao
    ADD CONSTRAINT fknvkuypi6ixinoorao880aj7mp FOREIGN KEY (coordenador_id_usuario) REFERENCES public.orientador(id_usuario);
 O   ALTER TABLE ONLY public.graduacao DROP CONSTRAINT fknvkuypi6ixinoorao880aj7mp;
       public          postgres    false    225    3334    231            F           2606    16763 1   graduacoes_atividades fknxp7v3lcf7t4sk6be0huvrsft    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacoes_atividades
    ADD CONSTRAINT fknxp7v3lcf7t4sk6be0huvrsft FOREIGN KEY (atividades_id) REFERENCES public.atividade(id);
 [   ALTER TABLE ONLY public.graduacoes_atividades DROP CONSTRAINT fknxp7v3lcf7t4sk6be0huvrsft;
       public          postgres    false    248    216    3314            >           2606    16707 &   orientador fko92sd8nhfnr0vr760pwtyrnqx    FK CONSTRAINT     �   ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT fko92sd8nhfnr0vr760pwtyrnqx FOREIGN KEY (id_graduacao) REFERENCES public.graduacao(id);
 P   ALTER TABLE ONLY public.orientador DROP CONSTRAINT fko92sd8nhfnr0vr760pwtyrnqx;
       public          postgres    false    231    3330    225            0           2606    16712 &   comentario fkqiquv464d2mulgvt9jc9mnwp5    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fkqiquv464d2mulgvt9jc9mnwp5 FOREIGN KEY (fk_id_usuario) REFERENCES public.usuario(id_usuario);
 P   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fkqiquv464d2mulgvt9jc9mnwp5;
       public          postgres    false    219    3346    244            8           2606    16717 2   graduacao_competencias fksuibbv3n0c8tc02jta8vpf8t1    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_competencias
    ADD CONSTRAINT fksuibbv3n0c8tc02jta8vpf8t1 FOREIGN KEY (competencias_id_competencia) REFERENCES public.competencia(id_competencia);
 \   ALTER TABLE ONLY public.graduacao_competencias DROP CONSTRAINT fksuibbv3n0c8tc02jta8vpf8t1;
       public          postgres    false    227    3322    220            .           2606    16722 %   atividade fkt62rjv68mvfg5918dod354v2m    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkt62rjv68mvfg5918dod354v2m FOREIGN KEY (complexidade_id) REFERENCES public.complexidade(id_complexidade);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkt62rjv68mvfg5918dod354v2m;
       public          postgres    false    216    3324    221            �   Z   x�5���0��R#�r�&�����x��pz�h\g�Y��?�a�SD�1�r7טE!ޝr 	��V7U�n�f@0�͡��'����ם�      �      x�36�44������ 
U�      �      x������ � �      �      x������ � �             x������ � �      �   �  x����n�0�g�)��A$E)�r(��K;f1jH�6@�+�}:�A�b��TR9	��l�4?��5�p����{\���7K���h��(����uU�U�n�i�����v����Bm�?�n>?>߷U�$�����oK��̇d���2`��4$qN�[q_��\�cV�<^=�3^�[��Y�9ó�fy�רl>��sG�t��.���g�j��O���@���J�SD�s�T�t�E{�Բ�J�$���n�'<d\ӷM���DFV�5���@�80AF}f&�y�k'��Kj���&����$���v��IZ9�vE�%�t��;����D��α�=��̲��{��������4T��`���%�>�r��ʺ���	.ѡ����C�tr�1�Ovx�����1& eٞ�"l:0pfw�[��G���d����`?�õJ���|�ۛ���Z�e�T-��      �      x������ � �      �   �   x�}�=
�0��Y:�OP�������c��"�mP���ce�����0	'b)n.��F��rJ�x���>5/����|�Q����l������H9��
�5~mp��Jk��V���7��"� �_�      �   �   x�%�K
�@��N��c���D��Fp�I:08��LO�L����jS��tӐ�ϭ��S�j�<P�EG.j�b�;6��!�d��Ɏ��S�{8�5�Lg	�ف[���9��΃+�_�'x����A;Ɗ��$�F�K4M�/ |w�5X      �   G   x�3�44�4��=�2%3�˘� �3+�L�ئ`�cNI"��)�!T،��1I^[\�������� Q�g      �   �   x�3�tI-N.�<����|����TN##c]CC]#K#+CC+#s=Cs3NNC�?NC.#N�J��T���<;b P �"5��C7����T���� c221�37B2Ǆ,s,��L�-`��q��qqq �R�      �      x������ � �      �   �   x�]O�n1���� �+PG��P�h�y�V:{���"R>�Z��OJ�t�3�;;�5ڠE�J������IqJ��Nuɚ;� �%-�48$�A�U5�*[AG=ݱ.�+c�L�k�3b�� >�M�<S�Y��MP\�G���s�G2��C[�I�ZL?�C%�*o=b�k#��g�-߰Ʀ�G9� ����i��{�)���8�o�ee�      �      x������ � �      �      x�34�4�24�4�2�`c a����� 6��      �      x�3�4�2�4b3�=... �      �   !   x�34�46�2�� �Ā�$ $,�b���� RS�      �      x���4�24�4����� ��      �   !   x�3��44�21�4�2��F���\1z\\\ 8�      �      x������ � �      �   S   x�3�tI-N.�<����|��|������ 3U!�ٙ�kb�雪��_��X��Ғ�_T�Z�i�e���	�0�e�!���� �A!�      �      x�3�4����� �#      �      x�3�4����� y"      �   �   x�U�;�0�z�9(#" �4��72�b���@T�"�i�hF���-����5tF;��Ʉ����bq#�(��\����w��s�\*m�{(�V�N����#uv�L��f@A=�G ���;��i��x�=���pM����|[5��a����+@=      �   Q   x�-��A�q1�l����`u0/k$O�bk���y�3��eH�df�^�#��w�b����������j��>/ _��3      �      x������ � �      �      x������ � �      �      x������ � �      �   a  x��V˲�Hs��aW����h5I����ՠ���X'��c�AET`�J���ʽwB�HX�A1�*������i>��҃��9I1�A\YR� �"hA������́�4�p�h��Xy�e�r����Ԕ&	Iē���bՆjg��5&���)?	*�/�q�殟��G�z�#m�q��8'��z��E1j��=���������ݾ���$�=�Y���)����b�K.Uf��'=� '�c�(s�Y����;��I�5΅��wW����DYV�9��ң|�J��D�Eb�q��� �[��Rč@\�a��4^���2���D�;�`�rꛓ@ |��'�0I��[߀����@R?Ċ;�Ek�U��l�Z��E�$3�����&+O�IDbÅ��ӃE�H]���횊Y�~�Z
�w�kPd��}�C�ן>�	C��r�#�*Uඏ���B[QK���y���*'=k}D3n��e�獤w�DY�p���/x���\� �SP�`\�a�" #��Gz�� Ra>�����	���tc�b�h>"L�X�q<���Ά�0����E;�I�jM�j�G/� X$t{h��|e���^� �W��JI��;��GƳV���!��x��c���z�挠֒ng�9i��L����{����Z�^Y�[��/����`2ycO�y,�'[ژ�zKg��h�����Ȩ!"4j`u�������eCAX{�&�Eǲj�x�(�)l4~1a��{
�F|AZ��J�MT��9U�A�U�;{W��ns����K"�`���fI��(��I�3U"��pMM���$�����߈�Ov5��4�3S�>1�6=h{���Dw�7k*�L�����]��f���������sp��\0w!z k�:+"�B��W�[/�ث�����k7��K5�U_ۦ3�c��w�*����XNĳP���q4M�^Js�ǯl)c�e����t��{��$N
w|s�܇*����ן#�C�V�(�D��csU3�����D�%y���Z�x�q��U���PhTMcS$Ql[X�{����
�g���_���~Ib�
`c�A/|��P�<q�.��6
�leQ��5�@�¿��r!H{�4�6N�G�4���$$NVз����ɔ���S�'?#�w�;�3�	B�qh�\k��PSʥ�3����Y]��`ԉ�����/�S�BP�=x�e�TE�L��bHq�~�$?�|5��<�"l�c������~Pp9H~��U��?ɫ/=W>��0�e$Rط�O��}/�n4w!
Sܾ��4|�Y��؛���`Ә���ֲVu��$/%��ďU��x�!�_��D �)O�7�j���� �8���1����P���X5z�uM�OZk�j�r�m��1:�e/��C������ώ��U�=��q��+��h�N�T�as5�£����f!Ǆ������q��!b�͐��P����|�1��l�v�� ��X$�]���G|�UE	��9�X����3����\M?2�.f.v��D<��Z쨉�H��w!8�$���uP/�vw8���rHd�}��Q��l��`��.��U��x��.g�I�����zg�X��:g^�3��w������� ڝ1     