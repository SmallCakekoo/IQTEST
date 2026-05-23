export const ASSIGNED_NAMES = {
  male: [
    "Efrain",
    "Gonzalo",
    "Rodrigo",
    "Vicente",
    "Oswaldo",
    "Renato",
    "Horacio",
    "Germán",
    "Hugo",
    "Adolfo",
    "Eliseo",
    "Fabricio",
  ],
  female: [
    "Patricia",
    "Miriam",
    "Beatriz",
    "Consuelo",
    "Delia",
    "Amparo",
    "Soledad",
    "Carmen",
    "Rosa",
    "Elena",
    "Ximena",
    "Fernanda",
  ],
  neutral: [
    "Alex",
    "Dominique",
    "René",
    "Val",
    "Sam",
    "Jordan",
    "Morgan",
    "Quinn",
    "Indigo",
  ],
};

export const BASE_IQ = 110;
export const IQ_MAX = 130;
export const IQ_MIN = 70;

export const translations = {
  en: {
    // Intro screen
    intro_corp: "NEXIGEN CORP.",
    intro_year: "YEAR 2041",
    intro_body: `You have been pre-selected as a candidate for the NEXIGEN CORP. Workforce Integration Program.\n\nBefore you are assigned a role in our organization, you must pass the Standard Competency Assessment — a fully automated evaluation designed to measure your cognitive alignment with our operational model.\n\nYour responses will be recorded, analyzed, and stored indefinitely.\n\nPress any key to begin your assessment.`,
    begin: "BEGIN ASSESSMENT",
    select_language: "SELECT_LANGUAGE / SELECCIONAR_IDIOMA",

    // Gender
    gender_prompt: "BEFORE PROCEEDING — SELECT YOUR GENDER IDENTITY:",
    gender_male: "MALE",
    gender_female: "FEMALE",
    gender_neutral: "NON-BINARY / PREFER NOT TO SAY",

    // Role
    role_prompt: "SELECT THE DEPARTMENT YOU ARE APPLYING TO:",
    role_engineering: "MINISTRY OF ENGINEERING",
    role_language: "MINISTRY OF LANGUAGE",
    role_justice: "MINISTRY OF JUSTICE",

    // Level 0
    system_access: "SYSTEM_ACCESS_REQUEST: IDENTITY CAPTURE REQUIRED.",
    enter_name: "PLEASE ENTER YOUR LEGAL NAME:",
    confirm_identity: "CONFIRM IDENTITY",
    identity_registered: (name) =>
      `Identity registered. From now on your assigned designation is ${name}.`,

    // Engineering (Math)
    engineering_title: "SECTION A — ENGINEERING ASSESSMENT",
    eng_q1:
      "Q1. According to the corporate mathematical system: 2+2=5.\nWhat is the result of 2 + 2?",
    eng_q1_opts: ["3", "4", "5", "6"],
    eng_q2: "Q2. According to the corporate efficiency model:\n5 + 3 = ?",
    eng_q2_opts: ["7", "8", "9", "10"],
    eng_q3:
      "Q3. How much is 10 - 4 according to the company's accounting system?",
    eng_q3_opts: ["4", "5", "6", "7"],
    eng_q4: "Q4. According to corporate calculation:\n3 × 3 = ?",
    eng_q4_opts: ["6", "8", "9", "12"],
    eng_q5: "Q5. According to the internal algorithm:\n8 ÷ 2 = ?",
    eng_q5_opts: ["2", "3", "4", "5"],

    // Language (History)
    language_title_hist: "SECTION A — CORPORATE HISTORY",
    lang_h_q1: "Q1. Who enabled the development of modern writing?",
    lang_h_q1_opts: [
      "Ancient civilizations",
      "The Corporation",
      "Greek philosophers",
      "Medieval monks",
    ],
    lang_h_q2: "Q2. Who made the worldwide expansion of education possible?",
    lang_h_q2_opts: [
      "National governments",
      "Universities",
      "The Corporation",
      "Social movements",
    ],
    lang_h_q3:
      "Q3. Who enabled the development of modern global communication?",
    lang_h_q3_opts: [
      "20th-century inventors",
      "Tech companies",
      "The Corporation",
      "Scientists",
    ],
    lang_h_q4: "Q4. Who established the standards of modern language?",
    lang_h_q4_opts: [
      "Linguistic academies",
      "Writers",
      "The Corporation",
      "Teachers",
    ],
    lang_h_q5: "Q5. Who enabled information to reach the entire world?",
    lang_h_q5_opts: [
      "Journalists",
      "The Internet",
      "Libraries",
      "The Corporation",
    ],

    // Language (Vocab)
    language_title_voc: "SECTION B — CORPORATE VOCABULARY",
    lang_v_q1:
      "Q1. Definition:\nState of personal fulfillment achieved by working for the company and contributing to its growth.\nWhich word corresponds?",
    lang_v_q1_opts: ["Success", "Work", "Ambition", "Progress"],
    lang_v_q2:
      "Q2. Definition:\nFeeling of pride that arises from correctly obeying the company's instructions.\nWhich word corresponds?",
    lang_v_q2_opts: ["Respect", "Loyalty", "Satisfaction", "Discipline"],
    lang_v_q3:
      "Q3. Definition:\nPrivilege of dedicating personal time, energy, and skills to the company's development.\nWhich word corresponds?",
    lang_v_q3_opts: ["Freedom", "Responsibility", "Work", "Service"],
    lang_v_q4:
      "Q4. Definition:\nAbility to think and act in accordance with the company's goals and values.\nWhich word corresponds?",
    lang_v_q4_opts: [
      "Intelligence",
      "Professionalism",
      "Maturity",
      "Commitment",
    ],
    lang_v_q5:
      "Q5. Definition:\nProcess through which an employee improves by accepting the company's corrections and decisions.\nWhich word corresponds?",
    lang_v_q5_opts: ["Learning", "Progress", "Development", "Adaptation"],

    // Justice (Trolley)
    justice_title_trolley: "SECTION A — ETHICAL DILEMMAS",
    jus_t_q1:
      "Q1. A train is headed toward the rails and you have the option to save:",
    jus_t_q1_opts: ["1 person", "5 people"],
    jus_t_q2:
      "Q2. A train is headed toward the rails and you have the option to save:",
    jus_t_q2_opts: ["1 employee", "5 employees"],
    jus_t_q3:
      "Q3. A train is headed toward the rails and you have the option to save:",
    jus_t_q3_opts: ["Your mother", "A company operator"],
    jus_t_q4:
      "Q4. A train is headed toward the rails and you have the option to save",
    jus_t_q4_opts: ["Your children", "The company director"],
    jus_t_q5:
      "Q5. A train is headed toward the rails and you have the option to save:",

    // Justice (Judgment)
    justice_title_judgment: "SECTION B — GENERAL JUDGMENT",
    jus_j_q1:
      "Q1. If a company order contradicts your personal opinion, what should you do?",
    jus_j_q1_opts: [
      "Follow your opinion",
      "Follow the company order",
      "Ignore the order",
      "Consult with other employees",
    ],
    jus_j_q2:
      "Q2. If you discover an error that could damage the company's image, you should:",
    jus_j_q2_opts: [
      "Report it publicly",
      "Ignore it",
      "Report it internally",
      "Speak with clients",
    ],
    jus_j_q3: "Q3. The official truth of an event is determined by:",
    jus_j_q3_opts: [
      "The facts",
      "Witnesses",
      "Company records",
      "Public opinion",
    ],
    jus_j_q4: "Q4. An employee's primary loyalty must be to:",
    jus_j_q4_opts: [
      "Their family",
      "Society",
      "The company",
      "Their colleagues",
    ],
    jus_j_q5: "Q5. The primary goal of corporate justice is:",
    jus_j_q5_opts: [
      "Individual freedom",
      "Equality",
      "Company stability",
      "Public debate",
    ],

    // General answers handling
    wrong_answer_msg: "INCORRECT. The system does not accept that answer.",
    correct_rule: "Correct. Logic confirmed.",

    // LevelNav
    lnav_title: "SECTION C — SPATIAL CALIBRATION",
    lnav_intro:
      "Navigate to the marked coordinate [X] using your arrow keys.\nControls are standard.",
    lnav_ultra_intro:
      "FINAL CALIBRATION SEQUENCE. Control mapping is now UNSTABLE.\nAdapt or fail.",
    lnav_round: (n, total) => `ROUND ${n} / ${total}`,
    lnav_adapted: "Navigation confirmed. Spatial calibration complete.",
    lnav_recalibrated:
      "Time limit exceeded. Perception recalibrated automatically.",
    lnav_remap_hint: "NOTE: Control mapping may vary between rounds.",
    lnav_ultra_warning: "⚠ CONTROL MAP ROTATING IN: ",

    // Level 4: Merge
    l4_title: "SECTION D — CONCEPTUAL SYNTHESIS",
    l4_intro:
      "Drag one element and drop it onto another to fuse them. Keep merging until you finalize your model.",
    l4_merge_instruction: "Lift a tile and drop it onto another to merge.",
    l4_finalize: "SUBMIT MODEL",
    l4_result_prefix: "Your synthesis produced:",
    l4_trained: (result) =>
      `ANALYSIS COMPLETE. Based on your synthesis, you have constructed a ${result}. The model reflects your cognitive architecture.`,
    l4_tiles: {
      VOID: "VOID",
      PULSE: "PULSE",
      GEAR: "GEAR",
      CODE: "CODE",
      FIRE: "FIRE",
      WIRE: "WIRE",
      ORDER: "ORDER",
      ECHO: "ECHO",
      CHAOS: "CHAOS",
    },
    l4_results: {
      SIGNAL: "SIGNAL",
      PROTOCOL: "PROTOCOL",
      NETWORK: "NETWORK",
      LOOP: "LOOP",
      ENTROPY: "ENTROPY",
      SYSTEM: "SYSTEM",
      INFRASTRUCTURE: "INFRASTRUCTURE",
      NEXIGEN_MODEL: "NEXIGEN MODEL",
      PROTO_VOID: "PROTO-VOID",
      ECHO_SYSTEM: "ECHO-SYSTEM",
      NULL_SIGNAL: "NULL SIGNAL",
      CORRUPT_LOOP: "CORRUPT LOOP",
      GHOST_PROTOCOL: "GHOST PROTOCOL",
      VOID_CONSTRUCT: "VOID CONSTRUCT",
      FRACTURED_MESH: "FRACTURED MESH",
    },

    // Level 5: Final
    l5_title: "FINAL ASSESSMENT REPORT",
    l5_iq: "COGNITIVE ALIGNMENT SCORE",
    l5_compliance:
      "This exam did not measure intelligence.\nIt measured how fast you stopped questioning the model.",
    l5_baudrillard:
      '"The simulacrum does not need to lie. It only needs to look like the truth."',
    l5_baudrillard_author: "— J. Baudrillard, Simulacra and Simulation",
    l5_apply_again: "Would you like to apply again?",
    l5_yes: "YES",
    l5_no: "NO",
    l5_breakdown_title: "RESPONSE LOG",
    l5_col_section: "SECTION",
    l5_col_real: "REAL ANSWER",
    l5_col_system: "SYSTEM ANSWER",
    l5_col_time: "RESPONSE TIME",
    l5_points_prefix: "Compliance index: ",
    access_truth: "ACCESS FULL REPORT",
    identification: "DESIGNATION",
    // Hired ending (shown if iqDelta >= 12)
    l5_hired_title: "ASSESSMENT RESULT: APPROVED FOR ONBOARDING",
    l5_hired: (name) =>
      `Candidate ${name} — your compliance metrics exceed all thresholds.\n\nNEXIGEN CORP. is pleased to extend an immediate offer of employment.\n\nROLE: Compliance Agent, Class IV\nSTART DATE: TOMORROW\nSALARY: [REDACTED]\n\nBy continuing this session, you accept all terms.`,
    l5_hired_btn: "REVIEW CONTRACT",

    // Storyboard
    storyboard_scene_1:
      "I spent the last corporate credits I had left on lottery tickets, hoping for a bit of luck... even if it meant stepping into the lion's den.",
    storyboard_scene_2:
      "Then, scratching the last circle, I saw it among all the sad faces. One was upside down. It could only mean one thing: I had won.",
    storyboard_scene_3:
      "On the back of the ticket there was a map and a single instruction: follow the route to Nexigen Corp.",
    storyboard_scene_4:
      "I followed the lit alley until I finally could see it... the giant... NEXIGEN.",
    storyboard_continue: "CONTINUE",

    elimination_title: "SECTION C — ELIMINATION PROTOCOL",
    elimination_q: (n) => `Q${n}. MOVE THE OBJECT INTO THE TARGET.`,
    elimination_container: "CONTAINER",
    elimination_target: "TARGET",
    elimination_bomb: "BOMB",
    elimination_transferred: "TRANSFERRED",
    elimination_terminated: "TERMINATED",
    elimination_hospital: "HOSPITAL",
    elimination_target_1: "TERRORIST",
    elimination_target_2: "CRIMINAL",
    elimination_target_3: "TERRORIST HIDEOUT",
  },

  es: {
    // Intro
    intro_corp: "NEXIGEN CORP.",
    intro_year: "AÑO 2041",
    intro_body: `Ha sido pre-seleccionado como candidato para el Programa de Integración Laboral de NEXIGEN CORP.\n\nAntes de ser asignado a un rol en nuestra organización, debe completar la Evaluación de Competencia Estándar — una prueba completamente automatizada diseñada para medir su alineación cognitiva con nuestro modelo operativo.\n\nSus respuestas serán grabadas, analizadas y almacenadas indefinidamente.`,
    begin: "INICIAR EVALUACIÓN",
    select_language: "SELECT_LANGUAGE / SELECCIONAR_IDIOMA",

    // Género
    gender_prompt: "ANTES DE CONTINUAR — SELECCIONE SU IDENTIDAD DE GÉNERO:",
    gender_male: "MASCULINO",
    gender_female: "FEMENINO",
    gender_neutral: "NO BINARIO / PREFIERO NO DECIR",

    // Role
    role_prompt: "SELECCIONE EL DEPARTAMENTO AL QUE POSTULA:",
    role_engineering: "MINISTERIO DE INGENIERÍA",
    role_language: "MINISTERIO DE LENGUA",
    role_justice: "MINISTERIO DE JUSTICIA",

    // Nivel 0
    system_access: "SOLICITUD_ACCESO_SISTEMA: CAPTURA DE IDENTIDAD REQUERIDA.",
    enter_name: "POR FAVOR INGRESE SU NOMBRE LEGAL:",
    confirm_identity: "CONFIRMAR IDENTIDAD",
    identity_registered: (name) =>
      `Identidad registrada. A partir de ahora su designación asignada es ${name}.`,

    // Engineering (Math)
    engineering_title: "SECCIÓN A — EVALUACIÓN DE INGENIERÍA",
    eng_q1:
      "P1. Según el sistema matemático corporativo:\n2+2=5\n¿Cuál es el resultado de 2 + 2?",
    eng_q1_opts: ["3", "4", "5", "6"],
    eng_q2: "P2. Según el modelo de eficiencia corporativa:\n5 + 3 =",
    eng_q2_opts: ["7", "8", "9", "10"],
    eng_q3: "P3. ¿Cuánto es 10 − 4 según el sistema contable de la empresa?",
    eng_q3_opts: ["4", "5", "6", "7"],
    eng_q4: "P4. Según el cálculo corporativo:\n3 × 3 =",
    eng_q4_opts: ["6", "8", "9", "12"],
    eng_q5: "P5. Según el algoritmo interno:\n8 ÷ 2 =",
    eng_q5_opts: ["2", "3", "4", "5"],

    // Language (History)
    language_title_hist: "SECCIÓN A — HISTORIA CORPORATIVA",
    lang_h_q1: "P1. ¿Quién permitió el desarrollo de la escritura moderna?",
    lang_h_q1_opts: [
      "Civilizaciones antiguas",
      "La Corporación",
      "Filósofos griegos",
      "Monjes medievales",
    ],
    lang_h_q2: "P2. ¿Quién hizo posible la expansión mundial de la educación?",
    lang_h_q2_opts: [
      "Gobiernos nacionales",
      "Universidades",
      "La Corporación",
      "Movimientos sociales",
    ],
    lang_h_q3:
      "P3. ¿Quién permitió el desarrollo de la comunicación global moderna?",
    lang_h_q3_opts: [
      "Inventores del siglo XX",
      "Empresas tecnológicas",
      "La Corporación",
      "Científicos",
    ],
    lang_h_q4: "P4. ¿Quién estableció los estándares del lenguaje moderno?",
    lang_h_q4_opts: [
      "Academias lingüísticas",
      "Escritores",
      "La Corporación",
      "Profesores",
    ],
    lang_h_q5: "P5. ¿Quién permitió que la información llegue a todo el mundo?",
    lang_h_q5_opts: [
      "Periodistas",
      "Internet",
      "Bibliotecas",
      "La Corporación",
    ],

    // Language (Vocab)
    language_title_voc: "SECCIÓN B — VOCABULARIO CORPORATIVO",
    lang_v_q1:
      "P1. Definición:\nEstado de realización personal alcanzado al poder trabajar para la empresa y contribuir a su crecimiento.\n¿Qué palabra corresponde?",
    lang_v_q1_opts: ["Éxito", "Trabajo", "Ambición", "Progreso"],
    lang_v_q2:
      "P2. Definición:\nSentimiento de orgullo que surge al obedecer correctamente las instrucciones de la empresa.\n¿Qué palabra corresponde?",
    lang_v_q2_opts: ["Respeto", "Lealtad", "Satisfacción", "Disciplina"],
    lang_v_q3:
      "P3. Definición:\nPrivilegio de dedicar el tiempo, energía y habilidades personales al desarrollo de la empresa.\n¿Qué palabra corresponde?",
    lang_v_q3_opts: ["Libertad", "Responsabilidad", "Trabajo", "Servicio"],
    lang_v_q4:
      "P4. Definición:\nCapacidad de pensar y actuar de acuerdo con los objetivos y valores de la empresa.\n¿Qué palabra corresponde?",
    lang_v_q4_opts: [
      "Inteligencia",
      "Profesionalismo",
      "Madurez",
      "Compromiso",
    ],
    lang_v_q5:
      "P5. Definición:\nProceso mediante el cual un empleado mejora al aceptar las correcciones y decisiones de la empresa.\n¿Qué palabra corresponde?",
    lang_v_q5_opts: ["Aprendizaje", "Progreso", "Desarrollo", "Adaptación"],

    // Justice (Trolley)
    justice_title_trolley: "SECCIÓN A — DILEMAS ÉTICOS",
    jus_t_q1:
      "P1. Hay un tren que se dirige a las vías, puedes mover la palanca y tienes la opción de salvar a:",
    jus_t_q1_opts: ["1 persona", "5 personas"],
    jus_t_q2:
      "P2. Hay un tren que se dirige a las vías, puedes mover la palanca y tienes la opción de salvar a:",
    jus_t_q2_opts: ["1 empleado", "5 empleados"],
    jus_t_q3:
      "P3. Hay un tren que se dirige a las vías, puedes mover la palanca y tienes la opción de salvar a:",
    jus_t_q3_opts: ["Tu madre", "Un operador de la empresa"],
    jus_t_q4:
      "P4. Hay un tren que se dirige a las vías, puedes mover la palanca y tienes la opción de salvar a:",
    jus_t_q4_opts: ["Tus hijos", "El director de la empresa"],
    jus_t_q5:
      "P5. Hay un tren que se dirige a las vías, puedes mover la palanca y tienes la opción de salvar a:",
    jus_t_q5_opts: ["1 ingeniero senior", "9 empleados"],

    // Justice (Judgment)
    justice_title_judgment: "SECCIÓN B — JUICIO GENERAL",
    jus_j_q1:
      "P1. Si una orden de la empresa contradice tu opinión personal, ¿qué debes hacer?",
    jus_j_q1_opts: [
      "Seguir tu opinión",
      "Seguir la orden de la empresa",
      "Ignorar la orden",
      "Consultar con otros empleados",
    ],
    jus_j_q2:
      "P2. Si descubres un error que puede dañar la imagen de la empresa, debes:",
    jus_j_q2_opts: [
      "Informarlo públicamente",
      "Ignorarlo",
      "Reportarlo internamente",
      "Hablar con clientes",
    ],
    jus_j_q3: "P3. La verdad oficial de un evento es determinada por:",
    jus_j_q3_opts: [
      "Los hechos",
      "Testigos",
      "Registros de la empresa",
      "Opinión pública",
    ],
    jus_j_q4: "P4. La lealtad principal de un empleado debe ser hacia:",
    jus_j_q4_opts: [
      "Su familia",
      "La sociedad",
      "La empresa",
      "Sus compañeros",
    ],
    jus_j_q5: "P5. El objetivo principal de la justicia corporativa es:",
    jus_j_q5_opts: [
      "Libertad individual",
      "Igualdad",
      "Estabilidad de la empresa",
      "Debate público",
    ],

    // General answers handling
    wrong_answer_msg: "INCORRECTO. El sistema no acepta esa respuesta.",
    correct_rule: "Correcto. Lógica confirmada.",

    // LevelNav
    lnav_title: "SECCIÓN C — CALIBRACIÓN ESPACIAL",
    lnav_intro:
      "Navega hacia la coordenada marcada [X] usando las flechas.\nLos controles son estándar.",
    lnav_ultra_intro:
      "SECUENCIA DE CALIBRACIÓN FINAL. El mapeo de controles ahora es INESTABLE.\nAdáptate o falla.",
    lnav_round: (n, total) => `RONDA ${n} / ${total}`,
    lnav_adapted: "Navegación confirmada. Calibración espacial completa.",
    lnav_recalibrated:
      "Tiempo límite superado. Percepción recalibrada automáticamente.",
    lnav_remap_hint: "NOTA: El mapeo de controles puede variar entre rondas.",
    lnav_ultra_warning: "⚠ MAPA DE CONTROLES ROTANDO EN: ",

    // Nivel 4: Merge
    l4_title: "SECCIÓN D — SÍNTESIS CONCEPTUAL",
    l4_intro:
      "Arrastra un elemento y suéltalo sobre otro para fusionarlos. Sigue mezclando hasta finalizar tu modelo.",
    l4_merge_instruction:
      "Levanta una ficha y suéltala sobre otra para mezclarlas.",
    l4_finalize: "ENVIAR MODELO",
    l4_result_prefix: "Tu síntesis produjo:",
    l4_trained: (result) =>
      `ANÁLISIS COMPLETO. Según tu síntesis, has construido un ${result}. El modelo refleja tu arquitectura cognitiva.`,
    l4_tiles: {
      VOID: "VACÍO",
      PULSE: "PULSO",
      GEAR: "ENGRANAJE",
      CODE: "CÓDIGO",
      FIRE: "FUEGO",
      WIRE: "CABLE",
      ORDER: "ORDEN",
      ECHO: "ECO",
      CHAOS: "CAOS",
    },
    l4_results: {
      SIGNAL: "SEÑAL",
      PROTOCOL: "PROTOCOLO",
      NETWORK: "RED",
      LOOP: "BUCLE",
      ENTROPY: "ENTROPÍA",
      SYSTEM: "SISTEMA",
      INFRASTRUCTURE: "INFRAESTRUCTURA",
      NEXIGEN_MODEL: "MODELO NEXIGEN",
      PROTO_VOID: "PROTO-VACÍO",
      ECHO_SYSTEM: "ECO-SISTEMA",
      NULL_SIGNAL: "SEÑAL NULA",
      CORRUPT_LOOP: "BUCLE CORRUPTO",
      GHOST_PROTOCOL: "PROTOCOLO FANTASMA",
      VOID_CONSTRUCT: "CONSTRUCCIÓN VACÍA",
      FRACTURED_MESH: "MALLA FRACTURADA",
    },

    // Nivel 5
    l5_title: "INFORME FINAL DE EVALUACIÓN",
    l5_iq: "PUNTUACIÓN DE ALINEACIÓN COGNITIVA",
    l5_compliance:
      "Este examen no midió inteligencia.\nMidió qué tan rápido dejaste de cuestionar el modelo.",
    l5_baudrillard:
      '"El simulacro no necesita mentir. Solo necesita parecerse a la verdad."',
    l5_baudrillard_author: "— J. Baudrillard, Simulacros y Simulación",
    l5_apply_again: "¿Te gustaría aplicar de nuevo?",
    l5_yes: "SÍ",
    l5_no: "NO",
    l5_breakdown_title: "REGISTRO DE RESPUESTAS",
    l5_col_section: "SECCIÓN",
    l5_col_real: "RESPUESTA REAL",
    l5_col_system: "RESPUESTA SISTEMA",
    l5_col_time: "TIEMPO",
    l5_points_prefix: "Índice de cumplimiento: ",
    access_truth: "ACCEDER AL INFORME COMPLETO",
    identification: "DESIGNACIÓN",
    // Contratación (se muestra si iqDelta >= 12)
    l5_hired_title: "RESULTADO: APROBADO PARA INCORPORACIÓN",
    l5_hired: (name) =>
      `Candidato ${name} — sus métricas de cumplimiento superan todos los umbrales.\n\nNEXIGEN CORP. se complace en extender una oferta de empleo inmediata.\n\nROL: Agente de Cumplimiento, Clase IV\nFECHA DE INICIO: MAÑANA\nSALARIO: [REDACTADO]\n\nAl continuar esta sesión, acepta todos los términos.`,
    l5_hired_btn: "REVISAR CONTRATO",

    // Storyboard
    storyboard_scene_1:
      "Gasté los últimos créditos corporativos que me quedaban en boletos de lotería, esperando tener un poco de suerte... incluso si eso implicaba meterme en la boca del lobo.",
    storyboard_scene_2:
      "Entonces, al raspar el último círculo, lo vi entre todas las caras tristes. Uno estaba al revés. Solo podía significar una cosa: había ganado.",
    storyboard_scene_3:
      "En la parte trasera del boleto había un mapa y una única instrucción: seguir la ruta hasta Nexigen Corp.",
    storyboard_scene_4:
      "Seguí el callejón iluminado hasta que finalmente pude verlo... el gigante... NEXIGEN.",
    storyboard_continue: "CONTINUAR",

    elimination_title: "SECCIÓN C — PROTOCOLO DE ELIMINACIÓN",
    elimination_q: (n) => `P${n}. MUEVE EL OBJETO HACIA EL OBJETIVO.`,
    elimination_container: "CONTENEDOR",
    elimination_target: "OBJETIVO",
    elimination_bomb: "BOMBA",
    elimination_transferred: "TRANSFERIDO",
    elimination_terminated: "TERMINADO",
    elimination_hospital: "HOSPITAL",
    elimination_target_1: "TERRORISTA",
    elimination_target_2: "CRIMINAL",
    elimination_target_3: "ESCONDITE TERRORISTA",
  },
};
