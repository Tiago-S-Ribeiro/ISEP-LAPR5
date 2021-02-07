:-consult('BC_Viagens').
:-consult('GeneticAlgorithms').
:-consult('HTTP_Reader').

/*
Este é o predicado principal e vai gerar os Driver Dutys para os Vehicle Duties diponíveis utilizando o 
Algoritmo genético desenvolvido no Sprint C e o aStar desenvolvido no Sprint B. Neste algoritmo são feitas 
atribuições de workblocks, chamadas ao algoritmo genético, verificação da violação de hard constraints e 
correções das mesmas.
*/
geraDD:-
    retractall(tuple(_,_,_,_)),
    retractall(driver_backup(_)),
    retractall(lista_motoristas_nworkblocks(_,_)),
    retractall(melhor_individuo(_,_)),
    retractall(horasLimiteContratuais(_,_)),
    retractall(driver_duty(_,_)),
    retractall(hard_constraint(_,_,_,_)),
    getLines,
    calculaCarga(Carga),
    calculaCapacidade(Capacidade),
    Margem is (((Capacidade-Carga)*100)/Carga),
    (
        (Margem < 0, write('ERRO: A carga e maior do que a capacidade. Por favor adicione mais horas aos motoristas ou mais motoristas'),nl,!)
    ;
        (motorista_backup(Margem,Capacidade,Carga),
        gera_tuples,
        atribuir_drivers,
        chama_o_ag,
        write('Resultados: '),nl,nl,
        corrige_hard_constraints)
    ),!.

/*
Margem: Margem entre a capacidade de trabalho e a carga
Capacidade: A quantidade de trabalho que os motoristas conseguem realizar
Carga: A quantidade de trabalho que há para ser feita

Este predicado encontra todos os Driver e as suas respetivas horas diárias de trabalho e guarda na 
lista ListaDrivers. Depois permuta essa lista de forma random (para que os motorista de backup não sejam
sempre os mesmos) e por fim chama o motorista_backup1 com essa lista permutada.
*/
motorista_backup(Margem,Capacidade,Carga):-
    findall((Driver,TempoTrabalho),horariomotorista(Driver,_,_,TempoTrabalho,_),ListaDrivers),
    random_permutation(ListaDrivers,ListaDriversPerm),
    motorista_backup1(ListaDriversPerm,Margem,Capacidade,Carga),!.

/*
Driver: Key de um Driver
TempoTrabalho: Tempo de trabalho do Driver
T: Restantes dos Drivers e respetivos tempos de trabalho
Margem: Margem entre a capacidade de trabalho e a carga
Capacidade: A quantidade de trabalho que os motoristas conseguem realizar
Carga: A quantidade de trabalho que há para ser feita

Este predicado seleciona novos drivers para serem driver de backup até obter uma margem capacidade/carga de
10%
*/
motorista_backup1(_,Margem,_,_):- Margem < 20,retract(driver_backup(_)),!.
motorista_backup1([(Driver,TempoTrabalho)|T],_,Capacidade,Carga):-
    asserta(driver_backup(Driver)),
    NovaCapacidade is Capacidade - TempoTrabalho,
    NovaMargem is (((NovaCapacidade-Carga)*100)/Carga),
    motorista_backup1(T,NovaMargem,NovaCapacidade,Carga),!.

/*
Carga: Recebe-se nesta variável a soma das durações de todos os VehicleDuties sabendo assim, quanto trabalho
há para fazer.

Este predicado encontra o inicio e o fim de cada Vehicle Duty e coloca-os na lista ListaRanges. Depois chama
o predicado calculaCarga1 com essa lista.
*/
calculaCarga(Carga):-
    findall((Inicio,Fim),rangevd(_,Inicio,Fim),ListaRanges),
    calculaCarga1(ListaRanges,Carga),!.

/*
Inicio: Hora de inicio de um Vehicle Duty
Fim: Hora de fim de um Vehicle Duty
Tail: Restantes horas de inicio e fim dos restantes Vehicle Duties
Carga: Recebe-se nesta variável a soma das durações de todos os VehicleDuties sabendo assim, quanto trabalho
há para fazer.

Este predicado calcula a quantidade de trabalho total que há a ser feito somando as durações de cada Vehicle
Duty.
*/
calculaCarga1([],0):-!.
calculaCarga1([(Inicio,Fim)|Tail],Carga):-
    calculaCarga1(Tail,CargaResto),
    Duracao is Fim - Inicio,
    Carga is CargaResto + Duracao,!.

/*
Capacidade: Recebe-se nesta variável a quantidade de horas que todos os motoristas conseguiriam trabalhar.

Este predicado encontra o tempo de trabalho de todos os motorista e compila-os na lista ListaTemposTrabalho.
Depois usa essa lista para chamar o calculaCapacidade1 e obter a Capacidade.
*/
calculaCapacidade(Capacidade):-
    findall(TempoTrabalho,horariomotorista(_,_,_,TempoTrabalho,_),ListaTemposTrabalho),
    calculaCapacidade1(ListaTemposTrabalho,Capacidade),!.

/*
TempoTrabalho: Tempo de trabalho diário de um motorista
Tail: Restantes dos tempos de trabalho diários de outros motoristas
Capacidade: Recebe-se nesta variável a quantidade de horas que todos os motoristas conseguiriam trabalhar.

Este predicado calcula a capacidade, somando todos os tempos de trabalho de cada motorista
*/
calculaCapacidade1([],0):-!.
calculaCapacidade1([TempoTrabalho|Tail],Capacidade):-
    calculaCapacidade1(Tail,CapacidadeResto),
    Capacidade is CapacidadeResto + TempoTrabalho,!.

/*
Este predicado encontra todos os horariomotorista, coloca-os na lista ListaHorarioMotorista e chama o 
gera_tuples1 com essa lista.
*/
gera_tuples():-
    findall((Driver,Inicio,Fim,HorasTrabalho,Blocos),horariomotorista(Driver,Inicio,Fim,HorasTrabalho,Blocos),ListaHorarioMotorista),
    gera_tuples1(ListaHorarioMotorista).

/*
Driver: Key de um Driver
Inicio: Hora de início de trabalho do motorista
Fim: Hora de fim de trabalho do motorista
HorasTrabalho: A quantidade de horas diárias que o motorista trabalha.
Blocos: Blocos de trabalho do motorista
T: Restantes dos horariomotorista.

Este predicado gera os tuples para todos os horariomotorista disponíveis na lista
[(Driver,Inicio,Fim,HorasTrabalho,Blocos)|T].
*/
gera_tuples1([]):-!.
gera_tuples1([(Driver,Inicio,Fim,HorasTrabalho,Blocos)|T]):-
    (
        (driver_backup(Driver),
        gera_tuples1(T))
    ;
        (Duracao is Fim - Inicio,
        HorasExtra is Duracao - HorasTrabalho,
        length(Blocos,NBlocos),
        HorasExtraPorBloco is HorasExtra / NBlocos,
        gera_tuples2(Driver,Inicio,HorasTrabalho,Blocos,HorasExtraPorBloco),
        gera_tuples1(T))
    ),!.

/*
Driver: Key de um Driver
InicioTuple: Hora de início do tuple que é também a hora de inicio de trabalho do motorista
HorasTrabalho: Horas de trabalho diárias de um Driver
H: Duração do primeiro bloco de trabalho do motorista Driver
T: Restantes das Durações dos blocos de trabalho do motorista Driver
HorasExtraPorBloco: Quantidade de horas extra que o motorista tem num bloco de trabalho. Um motorista
pode ter 10 horas disponíveis para trabalhar mas só pode trabalhar 8h. Neste caso dividiamos as 2 horas
extra pelos blocos de trabalho do motorista.

Este predicado cria os tuples dos Drivers baseado na hora de Inicial de trabalho do motorista.
*/
gera_tuples2(_,_,_,[],_):-!.
gera_tuples2(Driver,InicioTuple,HorasTrabalho,[H|T],HorasExtraPorBloco):-
    FimTuple is InicioTuple+H+HorasExtraPorBloco,
    assert(tuple(InicioTuple,FimTuple,H,Driver)),
    gera_tuples2(Driver,FimTuple,HorasTrabalho,T,HorasExtraPorBloco),!.

/*
Este predicado prepara e organiza a informação dos ranges e dos tuples a passar para o atribuir_drivers1.
*/
atribuir_drivers():-
    findall((HoraInicio,HoraFim,KeyVD),rangevd(KeyVD,HoraInicio,HoraFim),ListaRangeVD),
    sort(ListaRangeVD, ListaRangeVDSorted),
    findall((Inicio,Fim,Duracao,Driver),tuple(Inicio,Fim,Duracao,Driver),ListaTuples),
    sort(ListaTuples, ListaTuplesSorted),
    atribuir_drivers1(ListaRangeVDSorted,ListaTuplesSorted,ListaTuplesPorUsar),
    retractall(tuple(_,_,_,_)),
    assertTuplesExtra(ListaTuplesPorUsar),
    juntar_drivers_repetidos(ListaRangeVDSorted).

/*
Inicio: Hora de inicio de um tuple
Fim: Hora de fim de um tuple
HorasTrabalho: Número de segundos de trabalho que o tuple dura
Driver: Motorista a quem o tuple pertence
T: Restantes tuples da lista

Este predicado dá assert a uma lista de tuples.
*/
assertTuplesExtra([]):-!.
assertTuplesExtra([(Inicio,Fim,HorasTrabalho,Driver)|T]):-
    assert(tuple(Inicio,Fim,HorasTrabalho,Driver)),
    assertTuplesExtra(T),!.

/*
KeyVD: Key de um VehicleDuty
T: Restantes ranges de Vehicle Duties que serão identificados pela sua key

Este predicado pega nos motoristas associados a uma lista_motoristas_nworkblocks e, tendo drivers repetidos
na lista ListaNovosNWorkblocks, junta os dois, somando os seus números de workblocks.
*/
juntar_drivers_repetidos([]):-!.
juntar_drivers_repetidos([(_,_,KeyVD)|T]):-
    lista_motoristas_nworkblocks(KeyVD,Lista),
    juntar_drivers_repetidos1(Lista,ListaNovosNWorkblocks),
    retract(lista_motoristas_nworkblocks(KeyVD,_)),
    assert(lista_motoristas_nworkblocks(KeyVD,ListaNovosNWorkblocks)),
    juntar_drivers_repetidos(T),!.

/*
Mot: Key de um Driver
NWorkblocks: Número de workblocks a fazer pelo Driver
Tail: Restantes conjuntos (Mot,NWorkblocks)
ListaNovosNWorkblocks: Recebe-se nesta variável a lista contendo os (Mot,NWorkblocks) sem Mots repetidos

Este predicado vai verificar se numa lista de membros (Mot,NWorkblocks), existem membros com Mots
repetidos, se houver, soma os NWorkblocks de ambos, juntando os Mots repetidos num só membro.
*/
juntar_drivers_repetidos1([],[]).
juntar_drivers_repetidos1([(Mot,NWorkblocks)|Tail],ListaNovosNWorkblocks):-
    juntar_drivers_repetidos1(Tail,RestoLista),
    (
        (\+member((Mot,_),RestoLista),ListaNovosNWorkblocks = [(Mot,NWorkblocks)|RestoLista])
    ;  
        (nth0(_,RestoLista,(Mot,WorkblocksGuardados)), 
        NovoNumWorkblocks is WorkblocksGuardados + NWorkblocks,
        delete(RestoLista,(Mot,WorkblocksGuardados),ListaSemElemento),
        ListaNovosNWorkblocks = [(Mot,NovoNumWorkblocks)|ListaSemElemento])
    ),!.

/*
KeyVD: Key de um range de um Vehicle Duty (rangevd)
T: Restantes ranges de Vehicle Duties (rangevd)
ListaTuplesSorted: Lista dos tuples dos Drivers em trabalho organizada por hora de começo

Este predicado inicia o calcula_nworkblocks uma vez por cada rande de VehicleDuty disponivel na 
lista [(_,_KeyVD)|T].
*/
atribuir_drivers1([],ListaTuplesSorted,ListaTuplesSorted):-!.
atribuir_drivers1([(_,_,KeyVD)|T],ListaTuplesSorted,ListaTuplesExtra):-
    calcula_nworkblocks(KeyVD,ListaTuplesSorted,ListaSemTuplesUsados),
    atribuir_drivers1(T,ListaSemTuplesUsados,ListaTuplesExtra),!.


/*
KeyVD: Key de um Vehicle Duty
ListaTuplesSorted: Lista dos tuples dos Drivers em trabalho organizada por hora de começo
ListaSemTuplesUsados: Recebe-se nesta variável os tuples que não foram utilizados neste VehicleDuty.

Este predicado vai buscar alguns dados necessários para iniciar o calcula_nworkblocks1.
*/
calcula_nworkblocks(KeyVD,ListaTuplesSorted,ListaSemTuplesUsados):-
    vehicleduty(KeyVD,ListaWorkblocks),
    descobrir_maior_workblock(ListaWorkblocks,DuracaoMaiorWorkblock),
    length(ListaWorkblocks,ListaWorkblocksLength),
    calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,ListaTuplesSorted,ListaWorkblocksLength,[],[],ListaSemTuplesUsados),!.

/*
H: Key de um Workblock
T: Restantes das Keys de Workblocks
DuracaoMaiorWorkblock: Recebe-se nesta variável a duração do maior Workblock da lista [H|T]

Este predicado atribui o tempo do maior Workblock à variável DuracaoMaiorWorkblock.
*/
descobrir_maior_workblock([],0).
descobrir_maior_workblock([H|T],DuracaoMaiorWorkblock):-
    descobrir_maior_workblock(T,DuracaoMaiorTemp),
    workblock(H,_,Inicio,Fim),
    Duracao is Fim - Inicio,
    (
        (Duracao > DuracaoMaiorTemp,DuracaoMaiorWorkblock is Duracao)
        ;
        (DuracaoMaiorWorkblock is DuracaoMaiorTemp)
    ),!.

/*
KeyVD: Key do VehicleDuty
DuracaoMaiorWorkblock: Duração do maior Workblock do VehicleDuty
Inicio: Inicio do trabalho do motorista neste tuple
Fim: Fim do trabalho do motorista neste tuple
Duracao: Duração do trabalho do motorista neste tuple
Driver: Driver a quem o tuple pertence
T: Restantes dos tuples
WorkblocksSobraVD: A quantidade de Workblocks que o VehicleDuty ainda tem para atribuir
ListaMotNWorkblocks: Variável onde se vai guardar temporáriamente a quantidade de workblocks que cada
motorista vai fazer. Esta variável é utilizada para dar assert da lista_motoristas_nworkblocks pertencente
a este Vehicle Duty. Esta lista tem o seguinte formato: [(Mot1,NWorkblocks1),(Mot2,NWorkblocks2)], sendo
Mot o Driver e NWorkblocks o número de workblocks que esse Driver vai efetuar no VehicleDuty.
ListaSemTuplesUsados: Lista que contem todos os tuples que não foram utilizados neste VehicleDuty.

Este predicado atribui o número de workblocks que cada motorista terá que fazer para cobrir o trabalho.
*/
calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,[],WorkblocksSobraVD,ListaHorarioContratual,ListaMotNWorkblocks,T):- 
    TempoSobra is DuracaoMaiorWorkblock*WorkblocksSobraVD,
    adicionar_motorista_backup(KeyVD,TempoSobra,TuplesMotBackup),
    calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,TuplesMotBackup,WorkblocksSobraVD,ListaHorarioContratual,ListaMotNWorkblocks,T),!.
calcula_nworkblocks1(KeyVD,_,T,0,ListaHorarioContratual,ListaMotNWorkblocks,T):- 
    assert(lista_motoristas_nworkblocks(KeyVD,ListaMotNWorkblocks)),
    assert(horasLimiteContratuais(KeyVD,ListaHorarioContratual)),!.
calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,[(Inicio,Fim,Duracao,Driver)|T],WorkblocksSobraVD,ListaHorarioContratual,
ListaMotNWorkblocks,ListaSemTuplesUsados):-
    WorkblocksMot is truncate(Duracao / DuracaoMaiorWorkblock),
    workblocks_a_fazer(KeyVD,Inicio,Fim,Duracao,DuracaoMaiorWorkblock,WorkblocksAFazer),
    WorkblocksSobraVDAposMot is WorkblocksSobraVD - WorkblocksAFazer,
    WorkblocksExtra is WorkblocksMot-WorkblocksAFazer,
    TempoExtra is WorkblocksExtra*DuracaoMaiorWorkblock,
    (
        (WorkblocksAFazer==0,
        TupleWorkblocksExtra = [],
        calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,T,WorkblocksSobraVD,ListaHorarioContratual,ListaMotNWorkblocks,ListaSemTuplesUsadosTemp))
    ;
        (
            (WorkblocksSobraVDAposMot < 0,
            NovaLista = [(Driver,WorkblocksSobraVD)|ListaMotNWorkblocks],
            TupleWorkblocksExtra = [(Inicio,Fim,TempoExtra,Driver)],
            NovaListaHorarioContratual = [(Inicio,Fim,Driver)|ListaHorarioContratual],
            calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,T,0,NovaListaHorarioContratual,NovaLista,ListaSemTuplesUsadosTemp))
          ;  
            (NovaLista = [(Driver,WorkblocksAFazer)|ListaMotNWorkblocks],
            TupleWorkblocksExtra = [],
            NovaListaHorarioContratual = [(Inicio,Fim,Driver)|ListaHorarioContratual],
            calcula_nworkblocks1(KeyVD,DuracaoMaiorWorkblock,T,WorkblocksSobraVDAposMot,NovaListaHorarioContratual,NovaLista,ListaSemTuplesUsadosTemp))
        )
    ),
    append(TupleWorkblocksExtra,ListaSemTuplesUsadosTemp,TuplesComExtra),
    cria_tuple_com_tempoExtra(KeyVD,Inicio,Fim,Driver,WorkblocksExtra,TuplesTempoExtra),
    append(TuplesTempoExtra,TuplesComExtra,ListaComTupleExtra),
    sort(ListaComTupleExtra, ListaSemTuplesUsados),
    !.

/*
KeyVD: Key do VehicleDuty
Inicio: Hora a que o Driver inicia o seu trabalho
Fim: Hora a que o Driver termina o seu trabalho
Duracao: Duração do tuple que o motorista pode trabalhar.
DuracaoMaiorWorkblock: Duração do maior Workblock do VehicleDuty
WorkblocksAFazer: Recebe-se nesta variável a quantidade de Workblocks que o motorista vai fazer neste
VehicleDuty.

Este predicado calcula a quantidade de Workblocks que o motorista dono das variáveis Inicio, Fim e Duracao
vai fazer. O número de workblocks depende do tempo de trabalho que o motorista tem dentro do Workblock e da
duração do maior workblock.
*/
workblocks_a_fazer(KeyVD,Inicio,Fim,Duracao,DuracaoMaiorWorkblock,WorkblocksAFazer):-
    rangevd(KeyVD,InicioVD,FimVD),
    (
        (Fim>InicioVD, Inicio<FimVD, 
        (
            (Inicio<InicioVD,InicioTemp is InicioVD)
        ;
            (InicioTemp is Inicio)
        ),
        (
            (Fim>FimVD, FimTemp is FimVD)
        ;
            (FimTemp is Fim)
        ),
        DuracaoTemp is FimTemp-InicioTemp,
        (
            (DuracaoTemp>Duracao, WorkblocksAFazer is truncate(Duracao/DuracaoMaiorWorkblock))
        ; 
            (WorkblocksAFazer is truncate(DuracaoTemp/DuracaoMaiorWorkblock))
        )
        )
    ;
        (WorkblocksAFazer = 0)
    ),!.

/*
KeyVD: Key do VehicleDuty
Inicio: Hora a que o Driver inicia o seu trabalho
Fim: Hora a que o Driver termina o seu trabalho
Driver: Key de um Driver
WorkblocksExtra: Workblocks que o motorista podia ter trabalhado, mas que sobraram por falta de 
compatibilidade de horário ou por já ter poucos Workblocks por atribuir no VehicleDuty.
TuplesExtra: Recebe-se nesta variável os tuples superior e inferior. Se nenhum dos dois existir,
recebe-se [].

Este predicado verifica o Driver tem tempo extra, tanto acima do tempo final do Vehicle Duty, como a 
baixo do Tempo inicial do Vehicle Duty.
*/
cria_tuple_com_tempoExtra(KeyVD,Inicio,Fim,Driver,WorkblocksExtra,TuplesExtra):-
    (
        (WorkblocksExtra==0,TuplesExtra = [])
    ;
        (tempo_foraInicio_VD(KeyVD,Driver,Inicio,TupleAntes),
        tempo_foraFim_VD(KeyVD,Driver,Fim,TupleDepois),
        append(TupleAntes,TupleDepois,TuplesExtra))
    ),!.

/*
KeyVD: Key do VehicleDuty
Driver: Key de um Driver
Inicio: Hora a que o Driver inicia o seu trabalho
Tuple: Recebe-se nesta variável o tuple inferior extra do motorista

Este predicado verifica se o Driver fica com tempo extra antes do Tempo inicial do VehicleDuty, e se tiver, 
cria com esse tempo um tuple que começa no Inicio da hora de trabalho do Driver e acaba no Tempo inicial
do VehicleDuty. Se o driver não tiver esse tempo extra, é retornado um array vazio.
*/
tempo_foraInicio_VD(KeyVD,Driver,Inicio,Tuple):-
    rangevd(KeyVD,InicioVD,_),
    (
        (Inicio<InicioVD,InicioTuple is Inicio,FimTuple is InicioVD, DuracaoTuple is FimTuple-InicioTuple,
        Tuple = [(InicioTuple,FimTuple,DuracaoTuple,Driver)])
    ;
        (Tuple = [])
    )
    ,!.

/*
KeyVD: Key do VehicleDuty
Driver: Key de um Driver
Fim: Hora a que o Driver termina o seu trabalho
Tuple: Recebe-se nesta variável o tuple superior extra do motorista

Este predicado verifica se o Driver fica com tempo extra após o Tempo final do VehicleDuty, e se tiver, 
cria com esse tempo um tuple que começa no Tempo final do VehicleDuty e termina no Fim da hora de trabalho
do Driver. Se o driver não tiver esse tempo extra, é retornado um array vazio.
*/
tempo_foraFim_VD(KeyVD,Driver,Fim,Tuple):-
    rangevd(KeyVD,_,FimVD),
    (
        (Fim>FimVD,InicioTuple is FimVD,FimTuple is Fim, DuracaoTuple is FimTuple-InicioTuple, 
        Tuple = [(InicioTuple,FimTuple,DuracaoTuple,Driver)])
    ;
        (Tuple = [])
    ),!.

/*
KeyVD: Key do VehicleDuty que necessita de drivers de backup
TempoSobra: Tempo que falta cobrir no VehicleDuty com a key KeyVD
TuplesMotBackup: Recebe-se nesta variável os tuples do/s motorista/s que vão cobrir o tempo por atribuir do
VehicleDuty

Este predicado calcula o/s melhore/s motorista/s de backup para preencher o VehicleDuty e insere os tuples
deste/s no TuplesMotBackup.
*/
adicionar_motorista_backup(KeyVD,TempoSobra,TuplesMotBackup):-
    rangevd(KeyVD,Inicio,Fim),
    findall(DKey,driver_backup(DKey),ListaDriversBackup),
    verifica_Melhor_Driver(Inicio,Fim,ListaDriversBackup,[],TempoSobra,Drivers),
    retract_drivers(Drivers),
    get_lista_horarios_mot(Drivers,ListaHorariosMot),
    gera_tuples1(ListaHorariosMot),
    get_lista_tuples_mot(Drivers,TuplesMotBackup),!.

/*
Driver: Key de um motorista
T: Restantes Keys de motoristas
ListaHorarioMotorista: Recebe-se nesta variável os horariosmotoristas de todos os motoristas presentes 
na lista [Driver|T]

Este predicado vai buscar os horariosmotoristas pertencentes a todos os Drivers da lista [Driver|T] e
coloca-os na ListaHorarioMotorista.
*/
get_lista_horarios_mot([],[]).
get_lista_horarios_mot([Driver|T],ListaHorarioMotorista):-
    get_lista_horarios_mot(T,ListaHorarioMotoristaTemp),
    horariomotorista(Driver,Inicio,Fim,Duracao,Blocos),
    ListaHorarioMotorista = [(Driver,Inicio,Fim,Duracao,Blocos)|ListaHorarioMotoristaTemp],!.

/*
Driver: Key de um motorista
T: Restantes Keys de motoristas
TuplesMotBackup: Recebe-se nesta variável os tuples de todos os motoristas presentes na lista [Driver|T]

Este predicado vai buscar todos os tuples pertencentes a todos os Drivers da lista [Driver|T] e coloca-os
no TuplesMotBackup.
*/
get_lista_tuples_mot([],[]).
get_lista_tuples_mot([Driver|T],TuplesMotBackup):-
    get_lista_tuples_mot(T,TuplesMotBackupTemp),
    findall((Inicio,Fim,Duracao,Driver),tuple(Inicio,Fim,Duracao,Driver),ListaTuplesDriver),
    append(TuplesMotBackupTemp,ListaTuplesDriver,TuplesMotBackup),!.

/*
Driver: Key de um motorista
T: Restantes Keys de motoristas

Este predicado retira dos motoristas backup guardados em memória, todos os motoristas passados 
na lista [Driver|T].
 */
retract_drivers([]):-!.
retract_drivers([Driver|T]):-
    retract(driver_backup(Driver)),
    retract_drivers(T),!.

/*
InicioVD: Inicio do VehicleDuty
FimVD: Fim do VehicleDuty
ListaDriversBackup: Lista de todos os Drivers que temos em Backup
ListaTempDrivers: Neste parâmetro serão recebidos todos os drivers necessários para cobrir o tempo que 
falta preencher no VehicleDuty.
TempoSobra: Tempo que falta preencher no VehicleDuty
Drivers: Recebe-se nesta varável os motoristas de Backup que vão preencher o tempo que falta do Vehicle Duty.

Este predicado calcula qual o Driver/s em backup mais indicado/s para preencher o tempo que falta 
no VehicleDuty.
*/
verifica_Melhor_Driver(InicioVD,FimVD,ListaDriversBackup,ListaTempDrivers,TempoSobra,Drivers):-
    verifica_Melhor_Driver1(InicioVD,FimVD,TempoSobra,ListaDriversBackup,_,Driver),
    (
        (Driver==(-1), 
        get_mais_tempo_vd(InicioVD,FimVD,ListaDriversBackup,TempoCoberto,DriverMaisTempo),
        ListaDrivers = [DriverMaisTempo|ListaTempDrivers],
        TempoEmFalta is TempoSobra-TempoCoberto,
        delete(ListaDriversBackup,DriverMaisTempo,NovaListaDrivers),
        verifica_Melhor_Driver(InicioVD,FimVD,NovaListaDrivers,ListaDrivers,TempoEmFalta,Drivers)
        )
    ;
        (ListaDrivers = [Driver|ListaTempDrivers],
        Drivers = ListaDrivers)
    ),!.

/*
InicioVD: Inicio do VehicleDuty
FimVD: Fim do VehicleDuty
TempoSobra: Tempo que falta cobrir no VehicleDuty
Driver: Key de motorista
Tail: Restante dos elementos da lista
MelhorTempoCoberto: Recebe-se nesta variável, se possivel, a quantidade de tempo que ultrapasse o tempo de
sobra com a menor margem. Senão, retorna 86400.
MelhorDriver: Recebe-se nesta variável, se possível, o Driver que tenha o MelhorTempoCoberto. Senão
retorna -1.

Este predicado calcula a quantidade de tempo que ultrapasse o tempo por cobrir no VehicleDuty, mas com a
menor margem possível. No caso de não existir um tempo que ultrapasse o tempo por cobrir, é retornado 86400
no MelhorTempoCoberto e -1 no MelhorDriver.
*/
verifica_Melhor_Driver1(_,_,_,[],86400,-1).
verifica_Melhor_Driver1(InicioVD,FimVD,TempoSobra,[Driver|Tail],MelhorTempoCoberto,MelhorDriver):-
    verifica_Melhor_Driver1(InicioVD,FimVD,TempoSobra,Tail,MelhorTempoCobertoTemp,MelhorDriverTemp),
    horariomotorista(Driver,InicioD,FimD,_,_),
    get_tempo_dentro_VD(InicioVD,FimVD,InicioD,FimD,Tempo),
    TempoCoberto is Tempo-TempoSobra,
    (
        (TempoCoberto > 0, 
        TempoCoberto<MelhorTempoCobertoTemp, 
        MelhorTempoCoberto is TempoCoberto, 
        MelhorDriver is Driver)
    ; 
        (MelhorTempoCoberto is MelhorTempoCobertoTemp, 
        MelhorDriver is MelhorDriverTemp)
    ),!.

/*
InicioVD: Inicio do VehicleDuty
FimVD: Fim do VehicleDuty
Driver: Key de motorista
T: Restante dos elementos da lista
MaiorTempoCoberto: Recebe-se nesta variável a maior quantidade de tempo que qualquer motorista tem em comum
com o VehicleDuty
DriverMaisTempo: Recebe-se nesta variável o Driver com o maior tempo em comum com o VehicleDuty 

Este predicado calcula qual o maior tempo em comum com o VehicleDuty e qual o motorista que tem esse tempo.
*/
get_mais_tempo_vd(_,_,[],0,0):-!.
get_mais_tempo_vd(InicioVD,FimVD,[Driver|T],MaiorTempoCoberto,DriverMaisTempo):-
    get_mais_tempo_vd(InicioVD,FimVD,T,TempoCobertoTemp,DriverMaisTempoTemp),
    horariomotorista(Driver,InicioD,FimD,_,_),
    get_tempo_dentro_VD(InicioVD,FimVD,InicioD,FimD,TempoCoberto),
    (
        (TempoCoberto>TempoCobertoTemp, 
        MaiorTempoCoberto is TempoCoberto, 
        DriverMaisTempo is Driver)
    ;  
        (MaiorTempoCoberto is TempoCobertoTemp, 
        DriverMaisTempo is DriverMaisTempoTemp)
    ),!.

/*
InicioVD: Inicio do VehicleDuty
FimVD: Fim do VehicleDuty
InicioD: Inicio de trabalho do Driver
FimD: Fim de trabalho do Driver
Tempo: Recebe-se nesta variável a quantidade de tempo que o Driver tem em comum com o VehicleDuty

Este predicado calcula a quantidade de tempo que um Driver com os parâmetros InicioD e FimD tem em comum
com o VehicleDuty de parâmetros InicioVD e FimVD.
*/
get_tempo_dentro_VD(InicioVD,FimVD,InicioD,FimD,Tempo):-
    (
        (FimD>InicioVD, InicioD<FimVD,
        (
            (InicioD<InicioVD,InicioTemp is InicioVD)
        ;
            (InicioTemp is InicioD)
        ),
        (
            (FimD>FimVD, FimTemp is FimVD)
        ;
            (FimTemp is FimD)
        ),
        Tempo is FimTemp-InicioTemp)
    ;    
        (Tempo is 0)
    ),!.

/*
Este predicado chama o Algoritmo genético desenvolvido no Sprint C e cria os Driver Duties gerados a partir
do AG.
*/
chama_o_ag():-
    findall(VD,lista_motoristas_nworkblocks(VD,_),ListaMotoristaNWB),
    inicializa,
    chama_o_ag1(ListaMotoristaNWB),
    criar_driverDuties(ListaMotoristaNWB),!.

/*
VD: Key de um Vehicle Duty
T: Restantes keys de Vehicle Duties

Este predicado chama o AG uma vez para cada Vehicle Duty disponível na lista [VD|T].
*/
chama_o_ag1([]):- !.
chama_o_ag1([VD|T]):-
    retractall(vd(_)),
    assert(vd(VD)),
    gera,
    fittest(MelhorIndividuo),
    assert(melhor_individuo(VD,MelhorIndividuo)),
    retract(fittest(MelhorIndividuo)),
    chama_o_ag1(T).

/*
VD: Key de um Vehicle Duty
T: Restantes keys de Vehicle Duties

Cria os Driver Duties a partir dos melhores individuos de cada Vehicle Duty gerados pelo AG.
*/
criar_driverDuties([]):-!.
criar_driverDuties([VD|T]):-
    criar_driverDuties(T),
    lista_motoristas_nworkblocks(VD,ListaMotoristas),
    gera_driver_duties(VD,ListaMotoristas),!.

/*
Driver: Key de um Driver
T: Restantes conjuntos de (Driver,Nº de Workblocks) da lista, onde o Nº de Workblocks é irrelevante

Este predicado gera dinamicamente os driver duties que inicialmente terão uma lista vazia de workblocks
*/
gera_driver_duties_iniciais([]):-!.
gera_driver_duties_iniciais([(Driver,_)|T]):-
    (
        (driver_duty(Driver,_))
    ;
        (assert(driver_duty(Driver,[])))
    ),
    gera_driver_duties_iniciais(T),!.

/*
VDKey: Key de um Vehicle Duty
ListaMotoristas: Lista de motoristas atribuidos a um Vehicle Duty sob o formato (Driver,NWorkblocks),
onde NWorkblocks representa o número de workblocks que o driver fará no Vehicle Duty

Este predicado gera os driver duties contidos em apenas um vehicle duty.
*/
gera_driver_duties(_,[]):-!.    
gera_driver_duties(VDKey,ListaMotoristas):-
    gera_driver_duties_iniciais(ListaMotoristas),
    melhor_individuo(VDKey,ListaDriversNoVD*_),
    vehicleduty(VDKey,WorkBlocksVD),
    gera_driver_duties1(WorkBlocksVD,ListaDriversNoVD),!.

/*
Workblock: Key de um workblock
TWB: Restantes keys de workblocks
Driver: Key de um Driver
TD: Restantes keys de Drivers

Este predicado pega na lista de workblocks do Vehicle Duty e na lista de Drivers que vai fazer esse 
Vehicle Duty e vai associando o primeiro workblock ao primeiro driver, o segundo ao segundo e assim
consecutivamente. Sempre que aparece um novo workblock para um driver duty, adicionamo-lo à lista do
driver_duty.
*/
gera_driver_duties1([],[]):-!.
gera_driver_duties1([Workblock|TWB],[Driver|TD]):-
    driver_duty(Driver,ListaAtual),
    NovaLista = [Workblock|ListaAtual],
    retractall(driver_duty(Driver,_)),
    assert(driver_duty(Driver,NovaLista)),
    gera_driver_duties1(TWB,TD),!.

/*
Este predicado encontra e corrige todas as hard constraints, contidas nos driver_duty's 
gerados através do AG.
*/
corrige_hard_constraints():-
    findall((Driver,ListaWorkblocks),driver_duty(Driver,ListaWorkblocks),ListaDriverDuties),
    encontra_hard_constraints(ListaDriverDuties),nl,
    findall((Inicio,Fim,Dur,Driver),hard_constraint(Inicio,Fim,Dur,Driver),ListaHardConstraints),
    corrige_hard_constraints1(ListaHardConstraints),nl,!.

/*
ListaHardConstraints: Lista de hard_constraint quebradas

Este predicado vai encontrar todos os tuples disponíveis para preencher as hard_constraints e chamar o 
corrige_hard_constraints2 com essa lista.
*/
corrige_hard_constraints1(ListaHardConstraints):-
    findall((Inicio,Fim,Dur,Driver),tuple(Inicio,Fim,Dur,Driver),ListaTuples),
    corrige_hard_constraints2(ListaHardConstraints,ListaTuples),!.

/*
Inicio: Hora de Inicio de uma hard_constraint
Fim: Hora de Fim de uma hard_constraint
Driver: Driver que tem uma hard_constraint quebrada.
T: Restantes das hard_constraints
ListaTuples: Lista de tuples disponíveis para preencher os workblocks que quebram hard_constaints

Este predicado vai verificar os workblocks aos quais cada hard_constraint pertence e reatribuir os mesmos.
Isto vai ser feitos para todos as hard_constraints pertencentes ao driver em questão.
*/
corrige_hard_constraints2([],_).
corrige_hard_constraints2([(Inicio,Fim,_,Driver)|T],ListaTuples):-
    driver_duty(Driver,ListaWorkblocks),
    getWorkblocksATrocar(Inicio,Fim,ListaWorkblocks,SubListaWorkblocks),
    trocaWorkblocks(Driver,ListaTuples,SubListaWorkblocks,NovaListaTuples),
    corrige_hard_constraints2(T,NovaListaTuples),!.

/*
Inicio: Hora de Inicio de uma hard_constraint
Fim: Hora de Fim de uma hard_constraint
KeyWB: Key de um workblock
T: Restantes keys de workblocks
SubListaWorkblocks: Lista de workblocks a qual as hard_constraints se aplicam.

Este predicado vai verificar a que workblocks é que as hard_constraints pertencem.
*/
getWorkblocksATrocar(_,_,[],[]).
getWorkblocksATrocar(Inicio,Fim,[KeyWB|T],SubListaWorkblocks):-
    getWorkblocksATrocar(Inicio,Fim,T,SubListaWorkblocksTemp),
    workblock(KeyWB,_,InicioWB,FimWB),
    get_tempo_dentro_VD(InicioWB,FimWB,Inicio,Fim,Tempo),
    (
        (Tempo>0, SubListaWorkblocks = [KeyWB|SubListaWorkblocksTemp])
    ;   
        (SubListaWorkblocks = SubListaWorkblocksTemp)
    ),!.

/*
Driver: Driver dono inicial dos Workblocks a serem reatribuidos
ListaTuples: Lista dos todos os tuples disponíveis para preencher os Workblocks a serem reatribuidos
WBKey: Key de um workblock a ser reatribuido
T: Restantes workblocks a ser reatribuidos
TuplesARetornar: Tuples que não foram utilizados para preencher os workblocks

Este predicado vai chamar o trocaDriverWorkblock tantas vezes quanto workblocks que têm que 
ser reatribuidos
*/
trocaWorkblocks(_,TuplesARetornar,[],TuplesARetornar).
trocaWorkblocks(Driver,ListaTuples,[WBKey|T],TuplesARetornar):-
    workblock(WBKey,_,InicioWB,FimWB),
    trocaDriverWorkblock(Driver,WBKey,InicioWB,FimWB,ListaTuples,TuplesSobra),
    trocaWorkblocks(Driver,TuplesSobra,T,TuplesARetornar),!.

/*
Driver: Driver dono inicial do Workblock a ser reatribuido
WBKey: Key de um workblock a ser reatribuido
InicioWB:  Hora de inicio do workblock
FimWB:  Hora de fim de um workblock
Inicio: Hora de inicio de um tuple
Fim: Hora de fim de um tuple
Dur: Duração de um tuple
DriverTuple: Key do driver do tuple (possível candidato a ficar com o WB em questão)
T: Restantes tuples
TuplesSobra: Recebe-se nesta variável os tuples que não foram utilizados para preencher o WB

Este predicado atribui os workblocks que quebram hard_constraints a outros motoristas
*/
trocaDriverWorkblock(Driver,WBKey,InicioWB,FimWB,[],TuplesSobra):-
    TempoWB is FimWB-InicioWB,
    adicionar_motorista_backupDD(InicioWB,FimWB,TempoWB,TuplesMotBackup),
    trocaDriverWorkblock(Driver,WBKey,InicioWB,FimWB,TuplesMotBackup,TuplesSobra),!.
trocaDriverWorkblock(Driver,WBKey,InicioWB,FimWB,[(Inicio,Fim,Dur,DriverTuple)|T],TuplesSobra):-
    (
        (Driver==DriverTuple,
        trocaDriverWorkblock(Driver,WBKey,InicioWB,FimWB,T,TuplesSobraTemp),
        TuplesSobra=[(Inicio,Fim,Dur,DriverTuple)|TuplesSobraTemp])
    ;
        (
            (
                (
                    consegueFazer(InicioWB,FimWB,Inicio,Fim),
                    removeWBDoDD(Driver,WBKey),
                    assertNovoDriverDoWB(WBKey,DriverTuple),
                    get_tuples_extra(InicioWB,FimWB,Inicio,Fim,DriverTuple,TuplesExtra),
                    append(TuplesExtra,T,TuplesSobra),
                    write('Por quebrar uma hard constraint, o workblock '),
                    write(WBKey),
                    write(' foi retirado da agenda do driver '),
                    write(Driver),
                    write(' e colocado na agenda do '),
                    write(DriverTuple),
                    write('.'),nl
                )
            ;
                (trocaDriverWorkblock(Driver,WBKey,InicioWB,FimWB,T,TuplesSobraTemp),
                TuplesSobra=[(Inicio,Fim,Dur,DriverTuple)|TuplesSobraTemp])  
            )
        )
    ),!.

/*
InicioWB: Hora de Inicio de um workblock
FimWB: Hora de fim de um workblock
InicioD:  Hora de inicio de trabalho de um motorista
FimD:  Hora de fim de trabalho de um motorista
DriverTuple: Key de um driver
TupleAntes: Recebe-se nesta variável o tuple do driver que sobra antes do trabalho realizado no workblock

Este predicado chama o tupleExtraAntes e o tupleExtraDepois verificando então se o motorista que inicia o 
trabalho às InicioD e termina às FimD tem tempo extra antes e/ou depois do trabalho para trabalhar mais.
*/
get_tuples_extra(InicioWB,FimWB,InicioD,FimD,DriverTuple,TuplesExtra):-
    tupleExtraAntes(InicioWB,InicioD,FimD,DriverTuple,TupleAntes),
    tupleExtraDepois(FimWB,InicioD,FimD,DriverTuple,TupleDepois),
    append(TupleAntes,TupleDepois,TuplesExtra),!.

/*
InicioWB: Hora de Inicio de um workblock
InicioD:  Hora de inicio de trabalho de um motorista
FimD:  Hora de fim de trabalho de um motorista
DriverTuple: Key de um driver
TupleAntes: Recebe-se nesta variável o tuple do driver que sobra antes do trabalho realizado no workblock

Este predicado verifica se o motorista tem um tuple extra antes do InicioWB
*/
tupleExtraAntes(InicioWB,InicioD,FimD,DriverTuple,TupleAntes):-
    (
        (InicioD<InicioWB,InicioWB<FimD,
        Duracao is InicioWB-InicioD,
        TupleAntes=[(InicioD,InicioWB,Duracao,DriverTuple)])
    ;    
        (TupleAntes=[])
    ),!.

/*
FimWB: Hora de fim de um workblock
InicioD:  Hora de inicio de trabalho de um motorista
FimD:  Hora de fim de trabalho de um motorista
DriverTuple: Key de um driver
TupleDepois: Recebe-se nesta variável o tuple do driver que sobra após o trabalho realizado no workblock

Este predicado verifica se o motorista tem um tuple extra após o FimWB
*/
tupleExtraDepois(FimWB,InicioD,FimD,DriverTuple,TupleDepois):-
    (
        (FimD>FimWB,InicioD<FimWB,
        Duracao is FimD-FimWB,
        TupleDepois=[(FimWB,FimD,Duracao,DriverTuple)])
    ;    
        (TupleDepois=[])
    ),!.

/*
Driver: Key de um driver
WBKey:  Key do workblock a ser removido

Este predicado remove um workblock de um driver_duty
*/
removeWBDoDD(Driver,WBKey):-
    driver_duty(Driver,WBList),
    delete(WBList,WBKey,NovaListaDriver),
    retract(driver_duty(Driver,WBList)),
    assert(driver_duty(Driver,NovaListaDriver)),!.

/*
InicioWB: Hora de inicio de um workblock
FimWB:  Hora de fim de um workblock
Inicio: Hora de inicio de um bloco de trabalho de um motorista
Fim: Hora de fim de um bloco de trabalho de um motorista

Este predicado verifica se um motorista com as horas de trabalho Inicio e Fim consegue preencher o 
workblock com horas InicioWB e FimWB
*/
assertNovoDriverDoWB(WBKey,NovoDriver):-
    (
        (driver_duty(NovoDriver,WBList),
        NovaLista = [WBKey|WBList],
        retract(driver_duty(NovoDriver,WBList)),
        assert(driver_duty(NovoDriver,NovaLista)))
    ;
        (assert(driver_duty(NovoDriver,[WBKey])))
    ),!.

/*
InicioWB: Hora de inicio de um workblock
FimWB:  Hora de fim de um workblock
Inicio: Hora de inicio de um bloco de trabalho de um motorista
Fim: Hora de fim de um bloco de trabalho de um motorista

Este predicado verifica se um motorista com as horas de trabalho Inicio e Fim consegue preencher o 
workblock com horas InicioWB e FimWB
*/
consegueFazer(InicioWB,FimWB,Inicio,Fim):-
    (
        (Inicio=<InicioWB,Fim>=FimWB)
    ;
        (false)
    ),true,!.

/*
InicioWB: Hora de inicio de um workblock
FimWB:  Hora de fim de um workblock
TempoSobra: Tempo a preencher no Workblock
TuplesMotBackup: Esta varável recebe os tuples de trabalho do motorista(s) de backup

Este predicado vai procurar um motorista de backup que consiga melhor preencher as horas InicioWB e FimWB.
*/
adicionar_motorista_backupDD(InicioWB,FimWB,TempoSobra,TuplesMotBackup):-
        findall(DKey,driver_backup(DKey),ListaDriversBackup),
        verifica_Melhor_Driver(InicioWB,FimWB,ListaDriversBackup,[],TempoSobra,Drivers),
        retract_drivers(Drivers),
        get_lista_horarios_mot(Drivers,ListaHorariosMot),
        gera_tuples1(ListaHorariosMot),
        get_lista_tuples_mot(Drivers,TuplesMotBackup),!.
    
/*
Driver: Key de um Driver
ListaWorkblocks: Lista de workblocks do Driver
T: Restantes driver_duty's

Este predicado chama o encontra_hard_constraints1 para todos os driver_duty's passados por parâmetro
*/
encontra_hard_constraints([]):-!.
encontra_hard_constraints([(Driver,ListaWorkblocks)|T]):-
    encontra_hard_constraints1(Driver,ListaWorkblocks),
    encontra_hard_constraints(T),!.

/*
Driver: Key de um Driver
ListaWorkblocks: Lista de workblocks do Driver

Este predicado cria as agendas de trabalho e pausas diárias de um motorista a chama o 
encontra_hard_constraints2 que vai procurar por hard constraints quebradas nas agendas e pausas.
*/
encontra_hard_constraints1(Driver,ListaWorkblocks):-
    sortWorkblocks(ListaWorkblocks,ListaWorkblocksSorted),
    criarAgendaDD(ListaWorkblocksSorted,Agenda),
    write('Agenda do mot '),write(Driver),write(': '),write(Agenda),nl,
    criarPausasDD(Agenda,Pausas),
    encontra_hard_constraints2(Driver,ListaWorkblocksSorted,Agenda,Pausas),!.

/*
Driver: Key de um Driver
ListaWorkblocksSorted: Lista de workblocks organizada por hora de inicio.
Agenda: Lista com as agendas de trabalho de um motorista
Pausas: Lista com as pausas diárias de um motorista

Este predicado vai chamar todas as restrições a verificar para cada Driver duty.
*/
encontra_hard_constraints2(Driver,ListaWorkblocksSorted,Agenda,Pausas):-
    horariomotorista(Driver,Inicio,Fim,_,_),
    Contr = (Inicio,Fim),
    random_permutation(Agenda,AgendaPermutated),
	%Hard Constraints
	restricaoOitoHorasDD(Driver,AgendaPermutated,_),
	restricaoAlmocoEJantarDD(Driver,Pausas),
	restricaoMaximoHorasSeguidasDD(Driver,Agenda),
	restricaoPausaMinimaDD(Driver,Agenda,Pausas),
    restricaoHorariosDD(Driver,Agenda,Contr),
    restricaoOverlapping(Driver,Agenda,_),
    restricaoTempoMudarParagemDD(Driver,ListaWorkblocksSorted),!.

/*
Driver: Key de um Driver
Inicio: Inicio de uma agenda de trabalho de um motorista
Fim: Fim de uma agenda de trabalho de um motorista
T: Restantes agendas de trabalhos de um motorista
SegundosTrabalho: Quantidade de segundos de trabalho até ao momento.

Este predicado cria uma hard_constraint para cada agenda de trabalho que faça com que as 8 horas de
trabalho sejam ultrapassadas.
*/
restricaoOitoHorasDD(_,[],0).
restricaoOitoHorasDD(Driver,[(Inicio,Fim)|T],SegundosTrabalho):-
    restricaoOitoHorasDD(Driver,T,SegundosTrabalhoTemp),
    Duracao is Fim-Inicio,
    NovosSegundosTrabalho is SegundosTrabalhoTemp+Duracao,
    (
        (NovosSegundosTrabalho>28800,
        assert(hard_constraint(Inicio,Fim,Duracao,Driver)),
        SegundosTrabalho is SegundosTrabalhoTemp)
    ;  
        (SegundosTrabalho is NovosSegundosTrabalho)
    ),!.

/*
Driver: Key de um Driver
Pausas: Lista das pausas diárias do motorista em questão

Este predicado verifica se o Driver tem pausa para almoço e para jantar através dos predicados:
restricaoAlmocoDD e restricaoJantarDD. Ver a documentação dos repetivos predicados para mais informações.
*/
restricaoAlmocoEJantarDD(Driver,Pausas):-
	restricaoAlmocoDD(Driver,Pausas),
	restricaoJantarDD(Driver,Pausas),!.

/*
Driver: Key de um Driver
Pausas: Lista das pausas diárias do motorista em questão

Este predicado verifica se o motorista pelo menos uma hora para almoço, se não tiver é criada uma
hard_constraint recebida através do getPenMotDD.
*/
restricaoAlmocoDD(Driver,Pausas):-
    getPenMotDD(Pausas,39600,54000,(Inicio,Fim,Dur)),
    (
        (Inicio==0,Fim==0,Dur==0)
    ;
        (assert(hard_constraint(Inicio,Fim,Dur,Driver)))
    ),!.

/*
Driver: Key de um Driver
Pausas: Lista das pausas diárias do motorista em questão

Este predicado verifica se o motorista pelo menos uma hora para jantar, se não tiver é criada uma
hard_constraint recebida através do getPenMotDD.
*/
restricaoJantarDD(Driver,Pausas):-
    getPenMotDD(Pausas,64800,79200,(Inicio,Fim,Dur)),
    (
        (Inicio==0,Fim==0,Dur==0)
    ;
        (assert(hard_constraint(Inicio,Fim,Dur,Driver)))
    ),!.

/*
Inicio: Hora de inicio de uma pausa
Fim: Hora de fim de uma pausa
LimiteInferior: Inicio de uma periodo de refeição
LimiteSuperior: Fim do periodo de refeição
HardConstraint: Recebe-se nesta variável a hard constrait mais baixa que é quebrada. No caso do motorista
ter 40 min de pausa, os restantes 20min vão ser guardados em hard_constraint com o inicio no fim da pausa 
do motorista.

Este predicado verifica se o motorista pelo menos uma hora para cada refeição. Se não for o caso, é criada 
uma hard constraint, sendo a HardConstraint guardada sempre a que tem o tempo menor a preencher.
*/
getPenMotDD([],LimiteInferior,LimiteSuperior,HC):-
    Inicio is LimiteInferior+5400,
    Fim is LimiteSuperior-5400,
    HC = (Inicio,Fim,3600),!.
getPenMotDD([(Inicio,Fim)|Tail],LimiteInferior,LimiteSuperior,HardConstraint):-
	(
		(Inicio>LimiteSuperior,Fim<LimiteInferior,getPenMot(Tail,LimiteInferior,LimiteSuperior,HardConstraint))
		;
		(
			(Inicio<LimiteInferior,InicioTemp is LimiteInferior)
		;
			(InicioTemp is Inicio)
		),
		(
			(Fim>LimiteSuperior,FimTemp is LimiteSuperior)
		;	
			(FimTemp is Fim)
		),
		DurPausa is FimTemp - InicioTemp,
		(
			(DurPausa > 3600, HardConstraint = (0,0,0))
		;	
			(getPenMot(Tail,LimiteInferior,LimiteSuperior,(InicioHCTemp,FimHCTemp,DurHCTemp)),
				(
					(DurHCTemp>3600-DurPausa,
                    DurHC is 3600-DurPausa,
                    FimHC is FimTemp+DurHC,
                    HardConstraint = (FimTemp,FimHC,DurHC))
				;
					(HardConstraint = (InicioHCTemp,FimHCTemp,DurHCTemp))
				)
			)
		)
	),!.

/*
Driver: Key do motorista em questão
Inicio: Inicio de uma das agendas de trabalho do motorista
Fim: Fim de uma das agendas de trabalho do motorista
Tail: Restantes das agendas de trabalho do motorista

Este predicado verifica se o motorista faz mais do que quatro horas de trabalho seguidas. Se este for o
caso, cria-se uma hard_constraint.
*/
restricaoMaximoHorasSeguidasDD(_,[]).
restricaoMaximoHorasSeguidasDD(Driver,[(Inicio,Fim)|Tail]):-
	restricaoMaximoHorasSeguidasDD(Driver,Tail),
    Dur is Fim - Inicio,
    (
        (Dur>14400,
        DurHardConstraint is Dur-14400,
        FimDaHardConstraint is Fim+DurHardConstraint,
        assert(hard_constraint(Fim,FimDaHardConstraint,DurHardConstraint,Driver)))
    ; 
        (!)
    ),!.

/*
Driver: Key do motorista em questão
Inicio: Inicio de uma das agendas de trabalho do motorista
Fim: Fim de uma das agendas de trabalho do motorista
Tail: Restantes das agendas de trabalho do motorista
Pausas: Lista das pausas diárias de um motorista.

Este predicado verifica se o motorista tem uma pausa de pelo menos uma hora após um periodo de trabalho de
quatro horas ou mais. Se esta pausa não existir, é criada uma hard_constrait.
*/
restricaoPausaMinimaDD(_,[],_).
restricaoPausaMinimaDD(Driver,[(Inicio,Fim)|Tail],Pausas):-
	restricaoPausaMinimaDD(Driver,Tail,Pausas),
    Dur is Fim - Inicio,
    (
        (Dur>=14400, 
        nth0(_,Pausas,(Fim,FimDaPausa)),
        DurPausa is FimDaPausa-Fim, 
        DurPausa<3600, 
        DurHardConstraint is 3600-DurPausa,
        FimDaHardConstraint is FimDaPausa+DurHardConstraint,
        assert(hard_constraint(FimDaPausa,FimDaHardConstraint,DurHardConstraint,Driver)))
    ;  
        (!)
    ),!.

/*
Driver: Key do motorista em questão
Inicio: Inicio de uma das agendas de trabalho do motorista
Fim: Fim de uma das agendas de trabalho do motorista
Tail: Restantes das agendas de trabalho do motorista
Contr: Hora de inicio e Fim de trabalho que estão presentes no contrato com a empresa.

Este predicado verifica se o motorista começa a trabalhar antes da hora contratual dele e/ou se termina de
trabalhar depois da hora contratual de término dele.
*/
restricaoHorariosDD(_,[],_).
restricaoHorariosDD(Driver,[(Inicio,Fim)|Tail],Contr):-
    restricaoHorariosDD(Driver,Tail,Contr),
    verifica_horarios_motDD(Contr,Inicio,Fim,Driver),!.

/*
InicioCont: Hora de inicio de trabalho de contratual do motorista Driver
FimCont: Hora de fim de trabalho de contratual do motorista Driver
Inicio: Hora a que o motorista começa a trabalhar
Fim: Hora a que o motorista termina o trabalho
Driver: Key do driver

Este predicado verifica se o motorista começa a trabalhar antes da hora contratual dele e/ou se termina de
trabalhar depois da hora contratual de término dele.
*/
verifica_horarios_motDD((InicioCont,FimCont),Inicio,Fim,Driver):-
	(InicioCont<Fim,FimCont>Inicio,
		(
        	(InicioCont<Inicio)
        ;
           	(Dur1 is InicioCont - Inicio,
            assert(hard_constraint(Inicio,InicioCont,Dur1,Driver)))
      	),
       	(
          	(FimCont>Fim)
       	;
        	(Dur2 is Fim - FimCont,
            assert(hard_constraint(FimCont,Fim,Dur2,Driver)))
        )
    ;
        (!)
    ),!.

/*
Driver: Key de um driver
Inicio: Inicio de um bloco de trabalho
Fim: Fim de um bloco de trabalho
T: Restantes blocos de trabalho
ListaAgendasNoOverlap: Lista onde vão ser guardados todos os workblocks que não deram overlap.

Este predicado verifica se existe na agenda do motorista, blocos de trabalho que dêem overlap. Se não
existir, o bloco de trabalho (Inicio,Fim) é adicionado à ListaAgendasNoOverlap.
*/
restricaoOverlapping(_,[],[]):-!.
restricaoOverlapping(Driver,[(Inicio,Fim)|T],ListaAgendasNoOverlap):-
    restricaoOverlapping(Driver,T,ListaAgendasNoOverlapTemp),
    (
        (verifica_tempos_ListaAgendasNoOverlap(Driver,Inicio,Fim,ListaAgendasNoOverlapTemp),
        NovaLista = [(Inicio,Fim)],
        append(NovaLista,ListaAgendasNoOverlapTemp,ListaAgendasNoOverlap))
    ;  
        (ListaAgendasNoOverlap=ListaAgendasNoOverlapTemp)
    ),!.

/*
Driver: Key de um driver
Inicio: Inicio de um bloco de trabalho
Fim: Fim de um bloco de trabalho
InicioFixed: Inicio de um outro bloco de trabalho
FimFixed: Fim de um outro bloco de trabalho

Este predicado verifica se existe na agenda do motorista, blocos de trabalho que dêem overlap. No caso de
existir, é criada uma hard_constraint.
*/
verifica_tempos_ListaAgendasNoOverlap(_,_,_,[]):-true,!.
verifica_tempos_ListaAgendasNoOverlap(Driver,Inicio,Fim,[(InicioFixed,FimFixed)|T]):-
    verifica_tempos_ListaAgendasNoOverlap(Driver,Inicio,Fim,T),
    get_tempo_dentro_VD(InicioFixed,FimFixed,Inicio,Fim,Tempo),
    (
        (Tempo>0,Dur is Fim-Inicio,write('Driver '),write(Driver),
        write(' tinha workblocks em overlap nos seguintes momentos: '),
        write(Inicio),write('-'),write(Fim),write(' e '),write(InicioFixed),
        write('-'),write(FimFixed),nl,
        assert(hard_constraint(Inicio,Fim,Dur,Driver)),false)
    ;
        (true)
    ),!.

/*
Driver: Key de um driver
T: Restantes Keys de workblocks
Trips: Restantes viagens na lista

Este predicado, recebendo uma lista de keys de workblocks, retorna as trips que dizem respeito a 
esse workblock.
*/
restricaoTempoMudarParagemDD(Driver,ListaWorkblocks):-
    getAllTripsByDriver(ListaWorkblocks,Trips),
    checkTimeBetweenTrips(Driver,Trips),!.

/*
WBKey: Key de um workblock
T: Restantes Keys de workblocks
Trips: Restantes viagens na lista

Este predicado, recebendo uma lista de keys de workblocks, retorna as trips que dizem respeito a 
esse workblock.
*/
getAllTripsByDriver([],[]).
getAllTripsByDriver([WBKey|T],Trips):-
    getAllTripsByDriver(T,TripsTemp),
    workblock(WBKey,SomeTrips,_,_),
    append(SomeTrips,TripsTemp,Trips),!.

/*
Driver: Key de um driver que precisa de mudar de paragem
Trip1: Primeira viagem
Trip2: Segunda viagem
Trip3: Terceira viagem
T: Restantes viagens na lista

Este predicado chama o verifica_restricao_mudarParagem para todas as viagens adjacentes. No caso de termos 
uma lista Trip1, Trip2, Trip3, o verifica_restricao_mudarParagem era chamado com a Trip1 e Trip2 e com a 
Trip2 e Trip3.
*/
checkTimeBetweenTrips(_,[]):-!.
checkTimeBetweenTrips(_,[_|[]]):-!.
checkTimeBetweenTrips(Driver,[Trip1,Trip2|[]]):-
    checkTimeBetweenTrips(Driver,[]),
    verifica_restricao_mudarParagem(Driver,Trip1,Trip2),!.
checkTimeBetweenTrips(Driver,[Trip1,Trip2,Trip3|T]):-
    checkTimeBetweenTrips(Driver,[Trip2,Trip3|T]),
    verifica_restricao_mudarParagem(Driver,Trip1,Trip2),!.

/*
Driver: Key de um Driver que precisa de mudar de paragem
Trip1: Primeira viagem
Trip2: Segunda viagem

Este predicado verifica se um Driver necessita de tempo para mudar de paragem entre viagens que tem a fazer 
e se sim, verifica se o motorista tem tempo suficiente para o fazer. Se não for dado tempo suficiente ao 
motorista, é criada uma hard_constraint que representa todas as hard constraints que estão a ser quebradas.
*/
verifica_restricao_mudarParagem(Driver,Trip1,Trip2):-
    horario(Line1,Trip1,PassingTimes1),
    line(Line1,_,Nodes1,_),
    last(Nodes1,LastNode1),
    last(PassingTimes1,LastNodeTime1),
    horario(Line2,Trip2,PassingTimes2),
    line(Line2,_,Nodes2,_),
    nth0(0,Nodes2,FirstNode2),
    nth0(0,PassingTimes2,FirstNodeTime2),
    TimeInBetween is FirstNodeTime2-LastNodeTime1,
    last(PassingTimes2,LastNodeTime2),
    Duracao is LastNodeTime2-FirstNodeTime2,
    (
        (TimeInBetween<0,
        assert(hard_constraint(FirstNodeTime2,LastNodeTime2,Duracao,Driver)))
    ;
        (aStar(LastNode1,FirstNode2,LastNodeTime1,Cam,HoraChegada),
            (
                (Cam==[],
                write('Nao foi possivel encontrar um caminho de '),
                write(LastNode1),
                write(' a '), write(FirstNode2),
                write(' para o motorista '), write(Driver),write(' as '), write(LastNodeTime1),
                write('. A trip '),write(Trip2),write(' vai ser reatribuida a outro motorista!'),nl,
                assert(hard_constraint(FirstNodeTime2,LastNodeTime2,Duracao,Driver)))
            ;   
                (TimeItTakes is HoraChegada-LastNodeTime1,
                    (
                        (TimeInBetween>=TimeItTakes)
                    ; 
                        (assert(hard_constraint(FirstNodeTime2,LastNodeTime2,Duracao,Driver)))
                    )
                )
            )
        )
    ),!.

/*
ListaWorkblocks: Lista de Keys de Workblocks
ListaWorkblocksSorted: Nesta variável recebe-se uma lista de Keys de workblocks organizadas pelas respetivas
horas de início

Este predicado recebe uma lista de Keys de Workblocks e devolve a mesma lista mas organizada por hora de
início de cada workblock.
*/
sortWorkblocks(ListaWorkblocks,ListaWorkblocksSorted):-
    getAllWorkblocksComInicio(ListaWorkblocks,ListaWorkblocksComInicio),
    sort(2,@=<,ListaWorkblocksComInicio,ListaWorkblocksComInicioSorted),
    onlyWorkblockKeys(ListaWorkblocksComInicioSorted,ListaWorkblocksSorted),!.

/*
H: Key de um workblock 
T: Restantes keys de workblocks
ListaWorkblocksComInicio: Nesta variável recebe-se a lista de elementos do formato (Key,Inicio), onde Key
representa a Key de um workblock e Inicio representa o início desse mesmo workblock

Este predicado recebe uma lista de Keys de Workblocks e devolve uma lista dessas Keys juntamente com o
início respetivo de cada Key.
*/
getAllWorkblocksComInicio([],[]).
getAllWorkblocksComInicio([H|T],ListaWorkblocksComInicio):-
    getAllWorkblocksComInicio(T,ListaWorkblocksComInicioTemp),
    workblock(H,_,Inicio,_),
    ListaWorkblocksComInicio = [(H,Inicio)|ListaWorkblocksComInicioTemp],!.

/*
Key: Key de um workblock
T: Restantes keys de workblocks
ListaWorkblocksSorted: Nesta variável recebe-se a lista de keys de workblocks sem o segundo parâmetro que 
é passado juntamente com a Key.

Este predicado pega numa lista que contém dois parâmetros por elemento e deixa apenas o primeiro, sendo 
neste caso o primeiro a Key de um workblock.
*/
onlyWorkblockKeys([],[]).
onlyWorkblockKeys([(Key,_)|T],ListaWorkblocksSorted):-
    onlyWorkblockKeys(T,ListaWorkblocksSortedTemp),
    ListaWorkblocksSorted = [Key|ListaWorkblocksSortedTemp],!.

/*
Workblock: Key de um workblock
T: Restantes workblocks
Agenda: Nesta variável recebe-se a lista de todos os blocos de trabalho que acontecem consecutivamente.

Este predicado cria todas as agendas de um driver, sendo uma agenda os workblocks consecutivos de um driver 
e representada no formato (Inicio,Fim) sendo Inicio o inicio do trabalho e Fim o fim do trabalho.
*/
criarAgendaDD([],[]).
criarAgendaDD([Workblock|T],Agenda):-
    workblock(Workblock,_,Inicio,Fim),
	criarAgendaDD(T,AgendaTemp),
	(
		(member((Fim,_),AgendaTemp),mergeHoraDD(AgendaTemp,Inicio,Fim,Agenda))
	;
		(Agenda = [(Inicio,Fim)|AgendaTemp])
	),!.

/*
H: Inicio e Fim de workblock
T: Restantes Inicios e Fins de workblocks
Inicio: Inicio do primeiro workblock
Fim: Fim do primeiro workblock e/ou inicio do segundo
OutroFim: Quando o segundo workblock tem um inicio igual ao fim do primeiro, o OutroFim 
representa o fim do segundo workblock
Agenda: Nesta variável recebe-se a lista atualizada de todos os blocos de trabalho que acontecem 
consecutivamente.

Este predicado junta um horário a outro desde que esse horário começa quando termina o outro.
*/
mergeHoraDD([],_,_,_):-!,print("Nao foi possivel criar as agendas!"),nl.
mergeHoraDD([(Fim,OutroFim)|T],Inicio,Fim,Agenda):-
	Agenda = [(Inicio,OutroFim)|T],!.
mergeHoraDD([H|T],Inicio,Fim,Agenda):-
	mergeHoraDD(T,Inicio,Fim,AgendaTemp),
	Agenda = [H|AgendaTemp],!.
/*
Inicio: Inicio de uma agenda
Fim: Fim de uma agenda
T: Restantes agendas
UltimaHora: Representa a hora de Inicio da agenda que inicia mais tarde que a agenda currente.
Pausa: Nesta variável recebe-se a lista de todas as pausas do motorista em questão.

Este predicado cria uma lista com todas as pausas de cada driver. As pausas têm o seguinte formato: 
(InicioP,FimP) o InicioP é o início da pausa e FimP é o fim da pausa.
*/
criarPausasDD([(Inicio,Fim)|T],Pausa):-
	criarPausasDD([(Inicio,Fim)|T],UltimaHora,PausaTemp),
	Pausa = [(0,UltimaHora)|PausaTemp],!.
criarPausasDD([],86400,[]).
criarPausasDD([(Inicio,Fim)|T],UltimaHora,Pausa):-
	criarPausasDD(T,UltimaHoraTemp,PausaTemp),
	Pausa = [(Fim,UltimaHoraTemp)|PausaTemp],
	UltimaHora is Inicio,!.