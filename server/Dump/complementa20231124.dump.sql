PGDMP                     
    {            postgres    15.3 (Debian 15.3-1.pgdg110+1)    15.1 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    5    postgres    DATABASE     s   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE postgres;
                postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3545            �            1259    16400    aluno    TABLE     }   CREATE TABLE public.aluno (
    grr_aluno character varying(255),
    id_usuario bigint NOT NULL,
    id_graduacao bigint
);
    DROP TABLE public.aluno;
       public         heap    postgres    false            �            1259    16586    anexo    TABLE     �   CREATE TABLE public.anexo (
    id bigint NOT NULL,
    file_name character varying(255),
    file_path character varying(255),
    atividade_id bigint NOT NULL,
    relatorio_de_conclusao bigint NOT NULL,
    file_type character varying(255)
);
    DROP TABLE public.anexo;
       public         heap    postgres    false            �            1259    16585    anexo_id_seq    SEQUENCE     u   CREATE SEQUENCE public.anexo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.anexo_id_seq;
       public          postgres    false    232            �           0    0    anexo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.anexo_id_seq OWNED BY public.anexo.id;
          public          postgres    false    231            �            1259    16706 	   atividade    TABLE     �  CREATE TABLE public.atividade (
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
    DROP TABLE public.atividade;
       public         heap    postgres    false            �            1259    16705    atividade_id_seq    SEQUENCE     y   CREATE SEQUENCE public.atividade_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.atividade_id_seq;
       public          postgres    false    244            �           0    0    atividade_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.atividade_id_seq OWNED BY public.atividade.id;
          public          postgres    false    243            �            1259    16596    certificado    TABLE     L   CREATE TABLE public.certificado (
    id character varying(255) NOT NULL
);
    DROP TABLE public.certificado;
       public         heap    postgres    false            �            1259    16407 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id bigint NOT NULL,
    comentario character varying(255) NOT NULL,
    fk_id_atividade bigint,
    fk_id_usuario bigint
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    16411    competencia    TABLE     u   CREATE TABLE public.competencia (
    id_competencia bigint NOT NULL,
    nome_competencia character varying(255)
);
    DROP TABLE public.competencia;
       public         heap    postgres    false            �            1259    16415    complexidade    TABLE     �   CREATE TABLE public.complexidade (
    id_complexidade bigint NOT NULL,
    carga_horaria_maxima integer,
    carga_horaria_minima integer,
    nome_complexidade character varying(255)
);
     DROP TABLE public.complexidade;
       public         heap    postgres    false            �            1259    16604    contestacao    TABLE     �   CREATE TABLE public.contestacao (
    id bigint NOT NULL,
    descricao character varying(255),
    data_contestacao timestamp without time zone,
    status integer,
    tipo_contestacao integer,
    atividade_id bigint,
    id_usuario bigint
);
    DROP TABLE public.contestacao;
       public         heap    postgres    false            �            1259    16610    contestacao_carga_horaria    TABLE     �   CREATE TABLE public.contestacao_carga_horaria (
    carga_horaria_nova double precision,
    carga_horaria_original double precision,
    id bigint NOT NULL
);
 -   DROP TABLE public.contestacao_carga_horaria;
       public         heap    postgres    false            �            1259    16603    contestacao_id_seq    SEQUENCE     {   CREATE SEQUENCE public.contestacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.contestacao_id_seq;
       public          postgres    false    235            �           0    0    contestacao_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.contestacao_id_seq OWNED BY public.contestacao.id;
          public          postgres    false    234            �            1259    16384 	   graduacao    TABLE     ~   CREATE TABLE public.graduacao (
    id bigint NOT NULL,
    nome character varying(255),
    coordenador_id_usuario bigint
);
    DROP TABLE public.graduacao;
       public         heap    postgres    false            �            1259    16387    graduacao_competencias    TABLE     �   CREATE TABLE public.graduacao_competencias (
    graduacao_id bigint NOT NULL,
    competencias_id_competencia bigint NOT NULL
);
 *   DROP TABLE public.graduacao_competencias;
       public         heap    postgres    false            �            1259    33099    graduacao_complexidades    TABLE     �   CREATE TABLE public.graduacao_complexidades (
    graduacao_id bigint NOT NULL,
    complexidades_id_complexidade bigint NOT NULL
);
 +   DROP TABLE public.graduacao_complexidades;
       public         heap    postgres    false            �            1259    16390    graduacao_id_seq    SEQUENCE     y   CREATE SEQUENCE public.graduacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.graduacao_id_seq;
       public          postgres    false    214            �           0    0    graduacao_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.graduacao_id_seq OWNED BY public.graduacao.id;
          public          postgres    false    216            �            1259    24917 "   graduacao_servidores_coordenadores    TABLE     �   CREATE TABLE public.graduacao_servidores_coordenadores (
    graduacao_id bigint NOT NULL,
    servidores_coordenadores_id_usuario bigint NOT NULL
);
 6   DROP TABLE public.graduacao_servidores_coordenadores;
       public         heap    postgres    false            �            1259    16425 
   orientador    TABLE     \   CREATE TABLE public.orientador (
    id_usuario bigint NOT NULL,
    id_graduacao bigint
);
    DROP TABLE public.orientador;
       public         heap    postgres    false            �            1259    16618    papel    TABLE     :   CREATE TABLE public.papel (
    valor integer NOT NULL
);
    DROP TABLE public.papel;
       public         heap    postgres    false            �            1259    16428    projeto    TABLE     �   CREATE TABLE public.projeto (
    id_projeto bigint NOT NULL,
    descricao_projeto character varying(255),
    nome_projeto character varying(255),
    id_orientador bigint
);
    DROP TABLE public.projeto;
       public         heap    postgres    false            �            1259    16394    projeto_aluno    TABLE     d   CREATE TABLE public.projeto_aluno (
    id_projeto bigint NOT NULL,
    id_aluno bigint NOT NULL
);
 !   DROP TABLE public.projeto_aluno;
       public         heap    postgres    false            �            1259    24940    projeto_monitor    TABLE     h   CREATE TABLE public.projeto_monitor (
    id_projeto bigint NOT NULL,
    id_monitor bigint NOT NULL
);
 #   DROP TABLE public.projeto_monitor;
       public         heap    postgres    false            �            1259    16624    relatorio_de_conclusao    TABLE     m   CREATE TABLE public.relatorio_de_conclusao (
    id bigint NOT NULL,
    descricao character varying(255)
);
 *   DROP TABLE public.relatorio_de_conclusao;
       public         heap    postgres    false            �            1259    16623    relatorio_de_conclusao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relatorio_de_conclusao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.relatorio_de_conclusao_id_seq;
       public          postgres    false    239            �           0    0    relatorio_de_conclusao_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.relatorio_de_conclusao_id_seq OWNED BY public.relatorio_de_conclusao.id;
          public          postgres    false    238            �            1259    16434    servidor    TABLE     p   CREATE TABLE public.servidor (
    matricula_servidor character varying(255),
    id_usuario bigint NOT NULL
);
    DROP TABLE public.servidor;
       public         heap    postgres    false            �            1259    16635    status    TABLE     ;   CREATE TABLE public.status (
    valor integer NOT NULL
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    16410    tb_comentario_id_seq    SEQUENCE     }   CREATE SEQUENCE public.tb_comentario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.tb_comentario_id_seq;
       public          postgres    false    219            �           0    0    tb_comentario_id_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.tb_comentario_id_seq OWNED BY public.comentario.id;
          public          postgres    false    220            �            1259    16414 "   tb_competencias_id_competencia_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_competencias_id_competencia_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tb_competencias_id_competencia_seq;
       public          postgres    false    221            �           0    0 "   tb_competencias_id_competencia_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.tb_competencias_id_competencia_seq OWNED BY public.competencia.id_competencia;
          public          postgres    false    222            �            1259    16418 $   tb_complexidades_id_complexidade_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_complexidades_id_complexidade_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.tb_complexidades_id_complexidade_seq;
       public          postgres    false    223            �           0    0 $   tb_complexidades_id_complexidade_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tb_complexidades_id_complexidade_seq OWNED BY public.complexidade.id_complexidade;
          public          postgres    false    224            �            1259    16433    tb_projeto_id_projeto_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_projeto_id_projeto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.tb_projeto_id_projeto_seq;
       public          postgres    false    226            �           0    0    tb_projeto_id_projeto_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public.tb_projeto_id_projeto_seq OWNED BY public.projeto.id_projeto;
          public          postgres    false    227            �            1259    16437    usuario    TABLE     &  CREATE TABLE public.usuario (
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
       public         heap    postgres    false            �            1259    16442    tb_usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.tb_usuarios_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tb_usuarios_id_usuario_seq;
       public          postgres    false    229            �           0    0    tb_usuarios_id_usuario_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.tb_usuarios_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    230            �            1259    16640    tipo    TABLE     9   CREATE TABLE public.tipo (
    valor integer NOT NULL
);
    DROP TABLE public.tipo;
       public         heap    postgres    false            �            1259    16645    tipo_contestacao    TABLE     E   CREATE TABLE public.tipo_contestacao (
    valor integer NOT NULL
);
 $   DROP TABLE public.tipo_contestacao;
       public         heap    postgres    false            �           2604    16589    anexo id    DEFAULT     d   ALTER TABLE ONLY public.anexo ALTER COLUMN id SET DEFAULT nextval('public.anexo_id_seq'::regclass);
 7   ALTER TABLE public.anexo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    16709    atividade id    DEFAULT     l   ALTER TABLE ONLY public.atividade ALTER COLUMN id SET DEFAULT nextval('public.atividade_id_seq'::regclass);
 ;   ALTER TABLE public.atividade ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    244    243    244            �           2604    16445    comentario id    DEFAULT     q   ALTER TABLE ONLY public.comentario ALTER COLUMN id SET DEFAULT nextval('public.tb_comentario_id_seq'::regclass);
 <   ALTER TABLE public.comentario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    16446    competencia id_competencia    DEFAULT     �   ALTER TABLE ONLY public.competencia ALTER COLUMN id_competencia SET DEFAULT nextval('public.tb_competencias_id_competencia_seq'::regclass);
 I   ALTER TABLE public.competencia ALTER COLUMN id_competencia DROP DEFAULT;
       public          postgres    false    222    221            �           2604    16447    complexidade id_complexidade    DEFAULT     �   ALTER TABLE ONLY public.complexidade ALTER COLUMN id_complexidade SET DEFAULT nextval('public.tb_complexidades_id_complexidade_seq'::regclass);
 K   ALTER TABLE public.complexidade ALTER COLUMN id_complexidade DROP DEFAULT;
       public          postgres    false    224    223            �           2604    16607    contestacao id    DEFAULT     p   ALTER TABLE ONLY public.contestacao ALTER COLUMN id SET DEFAULT nextval('public.contestacao_id_seq'::regclass);
 =   ALTER TABLE public.contestacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    16443    graduacao id    DEFAULT     l   ALTER TABLE ONLY public.graduacao ALTER COLUMN id SET DEFAULT nextval('public.graduacao_id_seq'::regclass);
 ;   ALTER TABLE public.graduacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    214            �           2604    16448    projeto id_projeto    DEFAULT     {   ALTER TABLE ONLY public.projeto ALTER COLUMN id_projeto SET DEFAULT nextval('public.tb_projeto_id_projeto_seq'::regclass);
 A   ALTER TABLE public.projeto ALTER COLUMN id_projeto DROP DEFAULT;
       public          postgres    false    227    226            �           2604    16627    relatorio_de_conclusao id    DEFAULT     �   ALTER TABLE ONLY public.relatorio_de_conclusao ALTER COLUMN id SET DEFAULT nextval('public.relatorio_de_conclusao_id_seq'::regclass);
 H   ALTER TABLE public.relatorio_de_conclusao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    238    239            �           2604    16449    usuario id_usuario    DEFAULT     |   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.tb_usuarios_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    230    229            �          0    16400    aluno 
   TABLE DATA           D   COPY public.aluno (grr_aluno, id_usuario, id_graduacao) FROM stdin;
    public          postgres    false    218   S�       �          0    16586    anexo 
   TABLE DATA           j   COPY public.anexo (id, file_name, file_path, atividade_id, relatorio_de_conclusao, file_type) FROM stdin;
    public          postgres    false    232   ��       �          0    16706 	   atividade 
   TABLE DATA           6  COPY public.atividade (id, data_conclusao, data_contestacao, data_criacao, data_limite_candidatura, nome, certificado_id, competencia_id, complexidade_id, relatorio_de_conclusao, id_usuario, grr_aluno, projeto_id, fk_id_status, descricao, id_executor, contestacao_id, contestacao_carga_horaria_id) FROM stdin;
    public          postgres    false    244   9�       �          0    16596    certificado 
   TABLE DATA           )   COPY public.certificado (id) FROM stdin;
    public          postgres    false    233   ��       �          0    16407 
   comentario 
   TABLE DATA           T   COPY public.comentario (id, comentario, fk_id_atividade, fk_id_usuario) FROM stdin;
    public          postgres    false    219   ��       �          0    16411    competencia 
   TABLE DATA           G   COPY public.competencia (id_competencia, nome_competencia) FROM stdin;
    public          postgres    false    221   #�       �          0    16415    complexidade 
   TABLE DATA           v   COPY public.complexidade (id_complexidade, carga_horaria_maxima, carga_horaria_minima, nome_complexidade) FROM stdin;
    public          postgres    false    223   Ż       �          0    16604    contestacao 
   TABLE DATA           z   COPY public.contestacao (id, descricao, data_contestacao, status, tipo_contestacao, atividade_id, id_usuario) FROM stdin;
    public          postgres    false    235   �       �          0    16610    contestacao_carga_horaria 
   TABLE DATA           c   COPY public.contestacao_carga_horaria (carga_horaria_nova, carga_horaria_original, id) FROM stdin;
    public          postgres    false    236   %�       �          0    16384 	   graduacao 
   TABLE DATA           E   COPY public.graduacao (id, nome, coordenador_id_usuario) FROM stdin;
    public          postgres    false    214   B�       �          0    16387    graduacao_competencias 
   TABLE DATA           [   COPY public.graduacao_competencias (graduacao_id, competencias_id_competencia) FROM stdin;
    public          postgres    false    215   �       �          0    33099    graduacao_complexidades 
   TABLE DATA           ^   COPY public.graduacao_complexidades (graduacao_id, complexidades_id_complexidade) FROM stdin;
    public          postgres    false    247   N�       �          0    24917 "   graduacao_servidores_coordenadores 
   TABLE DATA           o   COPY public.graduacao_servidores_coordenadores (graduacao_id, servidores_coordenadores_id_usuario) FROM stdin;
    public          postgres    false    245   z�       �          0    16425 
   orientador 
   TABLE DATA           >   COPY public.orientador (id_usuario, id_graduacao) FROM stdin;
    public          postgres    false    225   ��       �          0    16618    papel 
   TABLE DATA           &   COPY public.papel (valor) FROM stdin;
    public          postgres    false    237   ѽ       �          0    16428    projeto 
   TABLE DATA           ]   COPY public.projeto (id_projeto, descricao_projeto, nome_projeto, id_orientador) FROM stdin;
    public          postgres    false    226   �       �          0    16394    projeto_aluno 
   TABLE DATA           =   COPY public.projeto_aluno (id_projeto, id_aluno) FROM stdin;
    public          postgres    false    217   /�       �          0    24940    projeto_monitor 
   TABLE DATA           A   COPY public.projeto_monitor (id_projeto, id_monitor) FROM stdin;
    public          postgres    false    246   P�       �          0    16624    relatorio_de_conclusao 
   TABLE DATA           ?   COPY public.relatorio_de_conclusao (id, descricao) FROM stdin;
    public          postgres    false    239   q�       �          0    16434    servidor 
   TABLE DATA           B   COPY public.servidor (matricula_servidor, id_usuario) FROM stdin;
    public          postgres    false    228   ��       �          0    16635    status 
   TABLE DATA           '   COPY public.status (valor) FROM stdin;
    public          postgres    false    240   �       �          0    16640    tipo 
   TABLE DATA           %   COPY public.tipo (valor) FROM stdin;
    public          postgres    false    241   �       �          0    16645    tipo_contestacao 
   TABLE DATA           1   COPY public.tipo_contestacao (valor) FROM stdin;
    public          postgres    false    242   +�       �          0    16437    usuario 
   TABLE DATA           e   COPY public.usuario (id_usuario, email, nome, fk_id_papel, senha, telefone, salt, ativo) FROM stdin;
    public          postgres    false    229   H�       �           0    0    anexo_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.anexo_id_seq', 12, true);
          public          postgres    false    231            �           0    0    atividade_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.atividade_id_seq', 1, true);
          public          postgres    false    243            �           0    0    contestacao_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.contestacao_id_seq', 1, false);
          public          postgres    false    234            �           0    0    graduacao_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.graduacao_id_seq', 12, true);
          public          postgres    false    216            �           0    0    relatorio_de_conclusao_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.relatorio_de_conclusao_id_seq', 1, true);
          public          postgres    false    238            �           0    0    tb_comentario_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tb_comentario_id_seq', 6, true);
          public          postgres    false    220            �           0    0 "   tb_competencias_id_competencia_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.tb_competencias_id_competencia_seq', 15, true);
          public          postgres    false    222            �           0    0 $   tb_complexidades_id_complexidade_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.tb_complexidades_id_complexidade_seq', 5, true);
          public          postgres    false    224            �           0    0    tb_projeto_id_projeto_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.tb_projeto_id_projeto_seq', 1, true);
          public          postgres    false    227            �           0    0    tb_usuarios_id_usuario_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.tb_usuarios_id_usuario_seq', 50, true);
          public          postgres    false    230                        2606    16713    atividade atividade_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT atividade_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.atividade DROP CONSTRAINT atividade_pkey;
       public            postgres    false    244            �           2606    16600    certificado certificado_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.certificado
    ADD CONSTRAINT certificado_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.certificado DROP CONSTRAINT certificado_pkey;
       public            postgres    false    233            �           2606    16614 8   contestacao_carga_horaria contestacao_carga_horaria_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.contestacao_carga_horaria
    ADD CONSTRAINT contestacao_carga_horaria_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.contestacao_carga_horaria DROP CONSTRAINT contestacao_carga_horaria_pkey;
       public            postgres    false    236            �           2606    16609    contestacao contestacao_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT contestacao_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.contestacao DROP CONSTRAINT contestacao_pkey;
       public            postgres    false    235            �           2606    16451    graduacao graduacao_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.graduacao
    ADD CONSTRAINT graduacao_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.graduacao DROP CONSTRAINT graduacao_pkey;
       public            postgres    false    214            �           2606    16622    papel papel_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.papel
    ADD CONSTRAINT papel_pkey PRIMARY KEY (valor);
 :   ALTER TABLE ONLY public.papel DROP CONSTRAINT papel_pkey;
       public            postgres    false    237            �           2606    16629 2   relatorio_de_conclusao relatorio_de_conclusao_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.relatorio_de_conclusao
    ADD CONSTRAINT relatorio_de_conclusao_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.relatorio_de_conclusao DROP CONSTRAINT relatorio_de_conclusao_pkey;
       public            postgres    false    239            �           2606    16639    status status_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (valor);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    240            �           2606    16453    aluno tb_alunos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT tb_alunos_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.aluno DROP CONSTRAINT tb_alunos_pkey;
       public            postgres    false    218            �           2606    16457    comentario tb_comentario_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT tb_comentario_pkey PRIMARY KEY (id);
 G   ALTER TABLE ONLY public.comentario DROP CONSTRAINT tb_comentario_pkey;
       public            postgres    false    219            �           2606    16459     competencia tb_competencias_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.competencia
    ADD CONSTRAINT tb_competencias_pkey PRIMARY KEY (id_competencia);
 J   ALTER TABLE ONLY public.competencia DROP CONSTRAINT tb_competencias_pkey;
       public            postgres    false    221            �           2606    16461 "   complexidade tb_complexidades_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.complexidade
    ADD CONSTRAINT tb_complexidades_pkey PRIMARY KEY (id_complexidade);
 L   ALTER TABLE ONLY public.complexidade DROP CONSTRAINT tb_complexidades_pkey;
       public            postgres    false    223            �           2606    16467    orientador tb_orientadores_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT tb_orientadores_pkey PRIMARY KEY (id_usuario);
 I   ALTER TABLE ONLY public.orientador DROP CONSTRAINT tb_orientadores_pkey;
       public            postgres    false    225            �           2606    16469    projeto tb_projeto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT tb_projeto_pkey PRIMARY KEY (id_projeto);
 A   ALTER TABLE ONLY public.projeto DROP CONSTRAINT tb_projeto_pkey;
       public            postgres    false    226            �           2606    16471    servidor tb_servidores_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.servidor
    ADD CONSTRAINT tb_servidores_pkey PRIMARY KEY (id_usuario);
 E   ALTER TABLE ONLY public.servidor DROP CONSTRAINT tb_servidores_pkey;
       public            postgres    false    228            �           2606    16473    usuario tb_usuarios_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id_usuario);
 B   ALTER TABLE ONLY public.usuario DROP CONSTRAINT tb_usuarios_pkey;
       public            postgres    false    229            �           2606    16649 &   tipo_contestacao tipo_contestacao_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.tipo_contestacao
    ADD CONSTRAINT tipo_contestacao_pkey PRIMARY KEY (valor);
 P   ALTER TABLE ONLY public.tipo_contestacao DROP CONSTRAINT tipo_contestacao_pkey;
       public            postgres    false    242            �           2606    16644    tipo tipo_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.tipo
    ADD CONSTRAINT tipo_pkey PRIMARY KEY (valor);
 8   ALTER TABLE ONLY public.tipo DROP CONSTRAINT tipo_pkey;
       public            postgres    false    241            �           2606    16704 #   usuario uk5171l57faosmj8myawaucatdw 
   CONSTRAINT     _   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk5171l57faosmj8myawaucatdw UNIQUE (email);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT uk5171l57faosmj8myawaucatdw;
       public            postgres    false    229            �           2606    16475 #   usuario uk5l3eo4wgf5hc00e186feu3ywc 
   CONSTRAINT     _   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uk5l3eo4wgf5hc00e186feu3ywc UNIQUE (email);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT uk5l3eo4wgf5hc00e186feu3ywc;
       public            postgres    false    229                       2606    33115 4   graduacao_complexidades uk_tmjfma7iqxcrf5hyx3k10hvgv 
   CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT uk_tmjfma7iqxcrf5hyx3k10hvgv UNIQUE (complexidades_id_complexidade);
 ^   ALTER TABLE ONLY public.graduacao_complexidades DROP CONSTRAINT uk_tmjfma7iqxcrf5hyx3k10hvgv;
       public            postgres    false    247            �           2606    16746 !   aluno ukj9d7ya9vcnd5lxeso6igkdk3a 
   CONSTRAINT     a   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT ukj9d7ya9vcnd5lxeso6igkdk3a UNIQUE (grr_aluno);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT ukj9d7ya9vcnd5lxeso6igkdk3a;
       public            postgres    false    218                       2606    16476 )   projeto_aluno fk17dgpd91ueh89scukd7a47g8d    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_aluno
    ADD CONSTRAINT fk17dgpd91ueh89scukd7a47g8d FOREIGN KEY (id_projeto) REFERENCES public.projeto(id_projeto);
 S   ALTER TABLE ONLY public.projeto_aluno DROP CONSTRAINT fk17dgpd91ueh89scukd7a47g8d;
       public          postgres    false    3302    217    226                       2606    24943 #   projeto fk2k48208orfnmk68vseetkrt06    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk2k48208orfnmk68vseetkrt06 FOREIGN KEY (id_orientador) REFERENCES public.orientador(id_usuario);
 M   ALTER TABLE ONLY public.projeto DROP CONSTRAINT fk2k48208orfnmk68vseetkrt06;
       public          postgres    false    225    3300    226                       2606    24902 &   contestacao fk3be6h4x7khm0y2fq0w4r5iay    FK CONSTRAINT     �   ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT fk3be6h4x7khm0y2fq0w4r5iay FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 P   ALTER TABLE ONLY public.contestacao DROP CONSTRAINT fk3be6h4x7khm0y2fq0w4r5iay;
       public          postgres    false    235    229    3306            
           2606    24963 &   comentario fk3brdmku7v5uyvkut6ma36bynr    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk3brdmku7v5uyvkut6ma36bynr FOREIGN KEY (fk_id_atividade) REFERENCES public.atividade(id);
 P   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk3brdmku7v5uyvkut6ma36bynr;
       public          postgres    false    3328    219    244                       2606    16481 2   graduacao_competencias fk3rtva3lrjuj2gyxjyp060tf91    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_competencias
    ADD CONSTRAINT fk3rtva3lrjuj2gyxjyp060tf91 FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 \   ALTER TABLE ONLY public.graduacao_competencias DROP CONSTRAINT fk3rtva3lrjuj2gyxjyp060tf91;
       public          postgres    false    3288    215    214                       2606    16486 !   aluno fk48gp4ibss40wqt4leuwvsujo6    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk48gp4ibss40wqt4leuwvsujo6 FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fk48gp4ibss40wqt4leuwvsujo6;
       public          postgres    false    3306    218    229                       2606    25114 %   atividade fk4fymruei0saful2pmrr7vr0pr    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk4fymruei0saful2pmrr7vr0pr FOREIGN KEY (contestacao_id) REFERENCES public.contestacao(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk4fymruei0saful2pmrr7vr0pr;
       public          postgres    false    244    3314    235                       2606    16491 &   orientador fk72jl3ly42mrskl0qdhjoty6gj    FK CONSTRAINT     �   ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT fk72jl3ly42mrskl0qdhjoty6gj FOREIGN KEY (id_usuario) REFERENCES public.servidor(id_usuario);
 P   ALTER TABLE ONLY public.orientador DROP CONSTRAINT fk72jl3ly42mrskl0qdhjoty6gj;
       public          postgres    false    228    3304    225                       2606    16496 $   servidor fk75670hk65c3ttu76q4d1db0j6    FK CONSTRAINT     �   ALTER TABLE ONLY public.servidor
    ADD CONSTRAINT fk75670hk65c3ttu76q4d1db0j6 FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 N   ALTER TABLE ONLY public.servidor DROP CONSTRAINT fk75670hk65c3ttu76q4d1db0j6;
       public          postgres    false    3306    229    228            	           2606    16501 !   aluno fk8j2xbiwa13ayr82qoext4wept    FK CONSTRAINT     �   ALTER TABLE ONLY public.aluno
    ADD CONSTRAINT fk8j2xbiwa13ayr82qoext4wept FOREIGN KEY (id_graduacao) REFERENCES public.graduacao(id);
 K   ALTER TABLE ONLY public.aluno DROP CONSTRAINT fk8j2xbiwa13ayr82qoext4wept;
       public          postgres    false    218    214    3288                       2606    25099 $   atividade fk9e22n65hw8xgymjlcwan1gml    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk9e22n65hw8xgymjlcwan1gml FOREIGN KEY (id_executor) REFERENCES public.usuario(id_usuario);
 N   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk9e22n65hw8xgymjlcwan1gml;
       public          postgres    false    229    244    3306                       2606    25109 %   atividade fk9jn9cjxi1bd1s5s8vg4p8ai0d    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fk9jn9cjxi1bd1s5s8vg4p8ai0d FOREIGN KEY (relatorio_de_conclusao) REFERENCES public.relatorio_de_conclusao(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fk9jn9cjxi1bd1s5s8vg4p8ai0d;
       public          postgres    false    3320    239    244                       2606    25069 !   anexo fkafsy6qk0s0y10imfs53dprtsa    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexo
    ADD CONSTRAINT fkafsy6qk0s0y10imfs53dprtsa FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);
 K   ALTER TABLE ONLY public.anexo DROP CONSTRAINT fkafsy6qk0s0y10imfs53dprtsa;
       public          postgres    false    3328    244    232            "           2606    33107 3   graduacao_complexidades fkd8q2kiqdaa613kt62huh41j93    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT fkd8q2kiqdaa613kt62huh41j93 FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 ]   ALTER TABLE ONLY public.graduacao_complexidades DROP CONSTRAINT fkd8q2kiqdaa613kt62huh41j93;
       public          postgres    false    214    247    3288                       2606    16682 5   contestacao_carga_horaria fkg8qabbi38nd344iqf7sldnqeu    FK CONSTRAINT     �   ALTER TABLE ONLY public.contestacao_carga_horaria
    ADD CONSTRAINT fkg8qabbi38nd344iqf7sldnqeu FOREIGN KEY (id) REFERENCES public.contestacao(id);
 _   ALTER TABLE ONLY public.contestacao_carga_horaria DROP CONSTRAINT fkg8qabbi38nd344iqf7sldnqeu;
       public          postgres    false    235    3314    236                       2606    24897 '   contestacao fkirs80lq97jdg2tyx2xny9w0wc    FK CONSTRAINT     �   ALTER TABLE ONLY public.contestacao
    ADD CONSTRAINT fkirs80lq97jdg2tyx2xny9w0wc FOREIGN KEY (atividade_id) REFERENCES public.atividade(id);
 Q   ALTER TABLE ONLY public.contestacao DROP CONSTRAINT fkirs80lq97jdg2tyx2xny9w0wc;
       public          postgres    false    235    244    3328                       2606    25119 %   atividade fkj1dno4qi2ilm5ye77mwsbgi5j    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkj1dno4qi2ilm5ye77mwsbgi5j FOREIGN KEY (contestacao_carga_horaria_id) REFERENCES public.contestacao_carga_horaria(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkj1dno4qi2ilm5ye77mwsbgi5j;
       public          postgres    false    236    244    3316                       2606    25089 %   atividade fkj73rny8fum5x4ymaym8hcv293    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkj73rny8fum5x4ymaym8hcv293 FOREIGN KEY (competencia_id) REFERENCES public.competencia(id_competencia);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkj73rny8fum5x4ymaym8hcv293;
       public          postgres    false    221    3296    244                        2606    24948 +   projeto_monitor fkj9rp5x3j51dv48ssm0fv7ji8a    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_monitor
    ADD CONSTRAINT fkj9rp5x3j51dv48ssm0fv7ji8a FOREIGN KEY (id_monitor) REFERENCES public.aluno(id_usuario);
 U   ALTER TABLE ONLY public.projeto_monitor DROP CONSTRAINT fkj9rp5x3j51dv48ssm0fv7ji8a;
       public          postgres    false    3290    218    246                       2606    24920 >   graduacao_servidores_coordenadores fkji91gr3lpdv3wsjjjnaqb449l    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_servidores_coordenadores
    ADD CONSTRAINT fkji91gr3lpdv3wsjjjnaqb449l FOREIGN KEY (servidores_coordenadores_id_usuario) REFERENCES public.servidor(id_usuario);
 h   ALTER TABLE ONLY public.graduacao_servidores_coordenadores DROP CONSTRAINT fkji91gr3lpdv3wsjjjnaqb449l;
       public          postgres    false    245    228    3304                       2606    16541 )   projeto_aluno fkkre1e780dye8pq1hfeg4pgg8r    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_aluno
    ADD CONSTRAINT fkkre1e780dye8pq1hfeg4pgg8r FOREIGN KEY (id_aluno) REFERENCES public.aluno(id_usuario);
 S   ALTER TABLE ONLY public.projeto_aluno DROP CONSTRAINT fkkre1e780dye8pq1hfeg4pgg8r;
       public          postgres    false    217    218    3290                       2606    25104 %   atividade fkl2xkjgwm0v3pkbh413imbw2x3    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkl2xkjgwm0v3pkbh413imbw2x3 FOREIGN KEY (projeto_id) REFERENCES public.projeto(id_projeto);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkl2xkjgwm0v3pkbh413imbw2x3;
       public          postgres    false    226    3302    244            #           2606    33102 3   graduacao_complexidades fklnwwy62x249ryhku2puhxqivj    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_complexidades
    ADD CONSTRAINT fklnwwy62x249ryhku2puhxqivj FOREIGN KEY (complexidades_id_complexidade) REFERENCES public.complexidade(id_complexidade);
 ]   ALTER TABLE ONLY public.graduacao_complexidades DROP CONSTRAINT fklnwwy62x249ryhku2puhxqivj;
       public          postgres    false    3298    247    223                       2606    25084 %   atividade fkltgpfutf26k4jhfe0gk006bnb    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkltgpfutf26k4jhfe0gk006bnb FOREIGN KEY (certificado_id) REFERENCES public.certificado(id);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkltgpfutf26k4jhfe0gk006bnb;
       public          postgres    false    244    3312    233                       2606    25074 !   anexo fkmtqbj5tjodshyjnvu0cqrvdrn    FK CONSTRAINT     �   ALTER TABLE ONLY public.anexo
    ADD CONSTRAINT fkmtqbj5tjodshyjnvu0cqrvdrn FOREIGN KEY (relatorio_de_conclusao) REFERENCES public.relatorio_de_conclusao(id);
 K   ALTER TABLE ONLY public.anexo DROP CONSTRAINT fkmtqbj5tjodshyjnvu0cqrvdrn;
       public          postgres    false    239    232    3320            !           2606    24953 +   projeto_monitor fkn2je2sh9a95axp3d9h9ufgwtq    FK CONSTRAINT     �   ALTER TABLE ONLY public.projeto_monitor
    ADD CONSTRAINT fkn2je2sh9a95axp3d9h9ufgwtq FOREIGN KEY (id_projeto) REFERENCES public.projeto(id_projeto);
 U   ALTER TABLE ONLY public.projeto_monitor DROP CONSTRAINT fkn2je2sh9a95axp3d9h9ufgwtq;
       public          postgres    false    246    226    3302                       2606    24925 >   graduacao_servidores_coordenadores fknf6h2y114aufnax95lxkk936k    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_servidores_coordenadores
    ADD CONSTRAINT fknf6h2y114aufnax95lxkk936k FOREIGN KEY (graduacao_id) REFERENCES public.graduacao(id);
 h   ALTER TABLE ONLY public.graduacao_servidores_coordenadores DROP CONSTRAINT fknf6h2y114aufnax95lxkk936k;
       public          postgres    false    3288    245    214                       2606    25079 $   atividade fknlevm692u469x5f76dxh7bmr    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fknlevm692u469x5f76dxh7bmr FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);
 N   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fknlevm692u469x5f76dxh7bmr;
       public          postgres    false    3306    244    229                       2606    24958 %   graduacao fknvkuypi6ixinoorao880aj7mp    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao
    ADD CONSTRAINT fknvkuypi6ixinoorao880aj7mp FOREIGN KEY (coordenador_id_usuario) REFERENCES public.orientador(id_usuario);
 O   ALTER TABLE ONLY public.graduacao DROP CONSTRAINT fknvkuypi6ixinoorao880aj7mp;
       public          postgres    false    225    3300    214                       2606    16556 &   orientador fko92sd8nhfnr0vr760pwtyrnqx    FK CONSTRAINT     �   ALTER TABLE ONLY public.orientador
    ADD CONSTRAINT fko92sd8nhfnr0vr760pwtyrnqx FOREIGN KEY (id_graduacao) REFERENCES public.graduacao(id);
 P   ALTER TABLE ONLY public.orientador DROP CONSTRAINT fko92sd8nhfnr0vr760pwtyrnqx;
       public          postgres    false    214    225    3288                       2606    24968 &   comentario fkqiquv464d2mulgvt9jc9mnwp5    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fkqiquv464d2mulgvt9jc9mnwp5 FOREIGN KEY (fk_id_usuario) REFERENCES public.usuario(id_usuario);
 P   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fkqiquv464d2mulgvt9jc9mnwp5;
       public          postgres    false    229    3306    219                       2606    16576 2   graduacao_competencias fksuibbv3n0c8tc02jta8vpf8t1    FK CONSTRAINT     �   ALTER TABLE ONLY public.graduacao_competencias
    ADD CONSTRAINT fksuibbv3n0c8tc02jta8vpf8t1 FOREIGN KEY (competencias_id_competencia) REFERENCES public.competencia(id_competencia);
 \   ALTER TABLE ONLY public.graduacao_competencias DROP CONSTRAINT fksuibbv3n0c8tc02jta8vpf8t1;
       public          postgres    false    3296    215    221                       2606    25094 %   atividade fkt62rjv68mvfg5918dod354v2m    FK CONSTRAINT     �   ALTER TABLE ONLY public.atividade
    ADD CONSTRAINT fkt62rjv68mvfg5918dod354v2m FOREIGN KEY (complexidade_id) REFERENCES public.complexidade(id_complexidade);
 O   ALTER TABLE ONLY public.atividade DROP CONSTRAINT fkt62rjv68mvfg5918dod354v2m;
       public          postgres    false    3298    223    244            �   T   x�5̹�0��&�$��� ��Æ��`8ɀ�{-�#�|v��n����v����"2NĚ*h�rs��(�٩:�p��1��      �   r   x�34���,.J���M�̋�)J-�/-JN-��I��K,���+L�S�
��9�0371=U��24"F�cIfYfJbJ������c@��^AJبĂ����Ē��<}�W� T1�      �   O   x�3��!##c]C]#3#C+ B��#�BR�KR�z��!��'e^~xq�BJ�BbIfYfJ"����+F��� ���      �      x������ � �      �   ^   x�3�(��M�,�WH��M�+I,��WHIU(I-.I�4�4�2�NM/�K��˘3$�(�!&����E%��0*��é����
<��qqq ��B�      �   �   x�%�K
�@��N��c���D��Fp�I:08��LO�L����jS��tӐ�ϭ��S�j�<P�EG.j�b�;6��!�d��Ɏ��S�{8�5�Lg	�ف[���9��΃+�_�'xŊ��$�F�K4����A;�}�M'4�      �   3   x�3�44�4��=�2%3�ˈ� �3+����&HlS0�1�$�+F��� ���      �      x������ � �      �      x������ � �      �   �   x�]O�
�0<�_�/��c�gDO��f��&�y�?�A�z͏����mwfvfG�Ri4輕����]1��>v�ٳSV^�x��`�ǇE�
�A�NA/�%�%h���yF�a]���z��J�h�2���J�׏�a�'tAb�Ęm�4(l�d3!X��m�\���k�6b����&>Zt�����ܩ��N���7�A[���� �f      �       x�3�4�2�44F\�F�& +F��� 5��      �      x�3�4�2�4bc 6bS�=... )      �      x�3�46�2�4��24���\1z\\\ 7N�      �      x�3��44�21�4�2�1z\\\ "��      �      x������ � �      �   1   x�3�tI-N.�<����|��|������ 3U!�ٙ�kb����� 3��      �      x�3�4����� �#      �      x�3�4����� y"      �      x�3�L)������� �      �   L   x�-���@���0E˲�K�����|	ļ��qTc�g�5��w�(C�&3�����q�������wN�����#      �      x������ � �      �      x������ � �      �      x������ � �      �   a  x��Vˮ�H��
��!Wy?'i�����LOJA�
P�������X�9׾���.$�V���^�|���?�S��0k�e���ߵY�̞�~)
�o͒.\2C����M��ip�;������(�,��p�S�c?��1�(d:���=Ϯ�� �X��^�P��l�`k� [­%�s��"�C@
��]Zr�|?͌�#I�l�
x�;i��Vj�����(�@�<aC�M��5�W�y?��new��Yx������\?����p�j` w��[�������׋n���tޡj=��@�/��u;�B����\��!���P�[��:г :��8Ϡ�"������w����F�&��~�_��*P��a1pC&Y��B.���7��]�׷�r焊y�M>���Ct�D�Sɒ(|#:3Tp#n�?{��������/���JqW��� $�>����%B�A[F�)!*��Bٰ��G�]:�S��Ԍ���^Ҟ^�v���4���L��9��Qu�Ҹ�M	 �I�.!N�������&��� &:���r��um0=�*���&��F����~��RE~֔�Ar1)�72�����6�Lf��1���	��/���[��nky<�������>��H����"�m�%|	��o-k�D�h�.�,��4���ع��	z�k��lI��p)�	Oʆ\dh�{���$�s�΂:<�V�[+���?�6�H]ˬ��@)Wp"$<��wсBݵ$o�KKys���k{��}D� �w]N������E�]�Z�py���?��"&~�v�Ϳ�C�Z��9ň?�n��YǊ�L��i��.w��xq�,R>�q�H���ْD��� N�CMs�:��]�����i�@}܆a����n�Rk���{mk�34�q�)Д��[�,l�X���K�0�(s��XL�K�yAr^�8�asQv��S�sO��	��%��vs��
s`ˬA�]�ɸԳ�����:��}D2�L�.=���ƨH��J�gv��!�����l���V�>�S������f��!��a����A>z�f��]�7e�+ka�����D��;�2��&ҜT[S˼ 2d�m��68��L��CjŗGa�-G1����6O㉷��+p�Z��>��	
�t��zw�2,���f՝�k��*�6k؛2�Ҕ8��b�AQ�0j��}5_�VNq��|3+D���1��ޠO�鯍즁��[����=D?���������E�Gck֯hI����۱/ә`���ſ�QDQ$��I�؅a���k��%R?@�j�*8�n����(��{U�Gב�-�`�kv�,˄}|-���@��KS��a��Ā�mpS������j�     