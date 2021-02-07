/*Base de Conhecimento*/
:-consult('BC_Viagens').
% Bibliotecas HTTP
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
% Bibliotecas JSON
:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).

:- json_object
    path(pathNodes:list(atom), '_id':atom,key:atom,isEmpty:boolean,'__v':integer),
    paths(paths:list(path)),
    pathNode('_id':atom,key:atom, node:atom, duration:integer, distance:number, '__v':integer),
    pathNode('_id':atom,key:atom, node:atom,'__v':integer),
    pathNodes(pathNodes:list(pathNode)),
    node('_id':atom,key:atom,name:atom,latitude:number,longitude:number,shortName:atom,isDepot:boolean,isReliefPoint:boolean,'__v':integer),
    nodes(nodes:list(node)).


assertIndividualNodes(nodes([])):-!.


assertIndividualNodes(nodes([node(_,_,A,B,C,D,E,F,_)|T])):-
        assert(node(A,D,E,F,B,C)),
        assertIndividualNodes(nodes(T)).

getLines():-
        write('\33\[2J'),
        write('Loading all the data necessary to run the algorithm, please be patient...'),nl,
        http_open("https://MDR_URL/paths/complete", SPaths, []),
        http_open("https://MDR_URL/pathnodes/complete", SPathNodes, []),
        http_open("https://MDR_URL/nodes/complete", SNodes,[]),

        json_read(SPaths, JsonPaths),
        json_read(SPathNodes, JsonPathNodes),
        json_read(SNodes, JsonNodes),
    
        json_to_prolog(JsonPaths,DataPaths),
        json_to_prolog(JsonPathNodes, DataPathNodes),
        json_to_prolog(JsonNodes,DataNodes),

        retractall(node(_,_,_,_,_,_)),
        retractall(line(_,_,_,_)),
        
        assertIndividualLines(DataPaths, DataNodes,DataPathNodes, 0),
        assertIndividualNodes(DataNodes),
        gera_edges.


assertIndividualLines(paths([]),_,_,_):-!.

assertIndividualLines(paths([path(PNList,_,PathKey,_,_)|PathTail]), DataNodes, DataPathNodes, Counter):-
        C is Counter+1,
        getNames(PNList,DataPathNodes, DataNodes, NamesList, DistanceList),
        assert(line(PathKey,C,NamesList,DistanceList)),
        assertIndividualLines(paths(PathTail),DataNodes,DataPathNodes,C).

getNames([],_,_,[],[]):-!.

getNames([PathNodeID|PathNodeIDTail],DataPathNodes,DataNodes,NamesList,DistanceList):-
        getNodeID(PathNodeID,DataPathNodes,Id),
        getNodeName(Id,DataNodes,Name),
        getDistance(PathNodeID,DataPathNodes,Distance),
        getNames(PathNodeIDTail,DataPathNodes, DataNodes, NL,DL),
        DistanceList=[Distance|DL],
        NamesList=[Name|NL].

getDistance(_, pathNodes([]),_):-write('Couldnt get distance for pathNode'),!.

getDistance(ID, pathNodes([pathNode(ID,_,_,_,Distance,_)|_]), Distance):-!.

getDistance(ID, pathNodes([pathNode(ID,_,_,_)|_]), 0):-!.

getDistance(ID, pathNodes([pathNode(_,_,_,_,_,_)|Tail]), Distance):-
        getDistance(ID,pathNodes(Tail),Distance),!.

getDistance(ID, pathNodes([pathNode(_,_,_,_)|Tail]), Distance):-
        getDistance(ID,pathNodes(Tail),Distance),!.



getNodeID(_,pathNodes([]),_):-write('Couldnt get node IDs'),!.

getNodeID(ID,pathNodes([pathNode(ID,_,Nodeid,_,_,_)|_]), Nodeid):-!.

getNodeID(ID,pathNodes([pathNode(ID,_,Nodeid,_)|_]), Nodeid):-!.

getNodeID(ID,pathNodes([pathNode(_,_,_,_,_,_)|Pntail]), NID):-
        getNodeID(ID,pathNodes(Pntail),NID),!.
        
getNodeID(ID,pathNodes([pathNode(_,_,_,_)|Pntail]), NID):-
        getNodeID(ID,pathNodes(Pntail),NID),!.



getNodeName(_,nodes([]),_):-!.

getNodeName(Nodeid,nodes([node(Nodeid,_,_,_,_,ShortName,_,_,_)|_]),ShortName):-!.


getNodeName(Nodeid,nodes([node(_,_,_,_,_,_,_,_,_)|NTail]),Name):-
        getNodeName(Nodeid,nodes(NTail),Name),!.


gera_edges:- retractall(edge(_,_,_)),
    findall(_,
            ((node(_,No1,true,false,_,_);node(_,No1,false,true,_,_);node(_,No1,true,true,_,_)),
            (node(_,No2,true,false,_,_);node(_,No2,false,true,_,_);node(_,No2,true,true,_,_)),
            No1\==No2,
            line(Key,_,LNos,_),
            ordem_membros(No1,No2,LNos),
            assertz(edge(No1,No2,Key))
    ),_).


ordem_membros(No1,No2,[No1|L]):- member(No2,L),!.

ordem_membros(No1,No2,[_|L]):- ordem_membros(No1,No2,L).


caminho(No1,Nof,LCaminho):-caminho(No1,Nof,[],LCaminho).

caminho(No,No,Lusadas,Lfinal):-reverse(Lusadas,Lfinal).

caminho(No1,Nof,Lusadas,Lfinal):-
        edge(No1,No2,N),
        \+member((_,_,N),Lusadas),
        \+member((No2,_,_),Lusadas),
        \+member((_,No2,_),Lusadas),
        caminho(No2,Nof,[(No1,No2,N)|Lusadas],Lfinal).


%Algoritmo gerador de todas as soluções que minimize o número de mudança de linhas com findall
menor_ntrocas_findall(Noi,Nof,LCaminho_menostrocas):-
        findall(LCaminho,caminho(Noi,Nof,LCaminho),LLCaminho),
        menor_findall(LLCaminho,LCaminho_menostrocas).

menor_findall([H],H):-!.

menor_findall([H|T],Hmenor):-menor_findall(T,L1),length(H,C),length(L1,C1),
        ((C<C1,!,Hmenor=H);Hmenor=L1).


%Algoritmo gerador de todas as soluções que minimize o número de mundaças de linhas sem findall
menor_ntrocas_sem_findall(Noi, Nof, LCaminho_menostrocas):-
        (melhor_caminho_sem_findall(Noi,Nof);true),
        retract(melhor_sol_ntrocas(LCaminho_menostrocas,_)).

melhor_caminho_sem_findall(Noi,Nof):-
        asserta(melhor_sol_ntrocas(_,10000)),
        caminho(Noi,Nof,LCaminho),
        atualiza_melhor_sem_findall(LCaminho),
        fail.

atualiza_melhor_sem_findall(LCaminho):-
        melhor_sol_ntrocas(_,N),
        length(LCaminho,C),
        C<N,retract(melhor_sol_ntrocas(_,_)),
        asserta(melhor_sol_ntrocas(LCaminho,C)).


%ALGORITMO GERADOR DE TODAS AS SOLUçÔES COM BASE NOS HORÁRIOS COM FINDALL
mais_cedo_findall(A,B,Hora,LCaminho_maiscedo, HoraChegada):-
        findall(LCaminho,caminho(A,B,LCaminho),LLCaminho),
        %LLCaminho contém todos os caminhos possiveis para chegar de A a B
        %O predicado menor vai verificar qual o caminho que chega mais cedo
        melhor_caminho_horario_findall(LLCaminho,Hora,HoraChegada,LCaminho_maiscedo),!.

melhor_caminho_horario_findall([],_,86401,_):-!.


%Paths: Um dos paths possiveis para chegar de uma estação a outra Ex: LCaminho = [('ESTPA', 'PARED', 'Path:38'),  ('PARED', 'LORDL', 'Path:11'),  ('LORDL', 'CRIST', 'Path:24')] ;
%T: Restantes dos paths possiveis
%Hora: Hora inicial de viagem, não podendo a viagem começar antes da hora indicada.
%HoraChegada: Hora retornada pelo predicado tempo_de_chegada que corresponderá à hora de chegada ao destino pelo path passado.
melhor_caminho_horario_findall([Path|T],Hora,MenorTempo,Hmenor):-
        melhor_caminho_horario_findall(T,Hora,MT1,H1),
        tempo_de_chegada(Path,Hora,HoraChegada),
        %Se hora de chegada menor que H1, retorna hora de chegada, senão retorna H1
        ((HoraChegada<MT1,!,MenorTempo=HoraChegada,Hmenor=Path);MenorTempo=MT1,Hmenor=H1).


%ALGORITMO GERADOR DE TODAS AS SOLUçÔES COM BASE NOS HORÁRIOS SEM FINDALL
mais_cedo_sem_findall(A,B,HoraInicio,LCaminho_maiscedo, HoraChegada):-
        (melhor_caminho_horario_sem_findall(A,B,HoraInicio);true),
        retract(melhor_sol_ntrocas(LCaminho_maiscedo,HoraChegada)).


melhor_caminho_horario_sem_findall(A,B,HoraInicio):-
        asserta(melhor_sol_ntrocas(_,86401)),
        caminho(A,B,LCaminho),
        atualiza_melhor_horario_sem_findall(LCaminho,HoraInicio),
        fail.

atualiza_melhor_horario_sem_findall(LCaminho,HoraInicio):-
        melhor_sol_ntrocas(_,N),
        tempo_de_chegada(LCaminho,HoraInicio,HoraChegada),
        HoraChegada<N,retract(melhor_sol_ntrocas(_,_)),
        asserta(melhor_sol_ntrocas(LCaminho,HoraChegada)).




tempo_de_chegada([],HoraInicio,HoraInicio):-!.

%A: Ponto de partida do path antes da mudança de linha
%B: Ponto de chegada do path e ponto onde se muda a linha
%Line: Linha onde o path acontece
%HoraInicio: Hora inicial da viagem do path A
%HoraChegada: Hora de chegada ao ponto B
tempo_de_chegada([(A,B,Line)|T], HoraInicio, HoraChegada):-
        %Guarda na variavel List a lista completa do percurso do path A-B
        line(Line,_,List,_),
        nth1(NA,List,A),
        %Guarda na variável N a posição do ponto B na lista do percurso
        nth1(NB,List,B),
        %Atribuição dos passing times do path currente à variavel LHorarios
        getHorariosFromPath(Line,ListaHorarios),
        %Procura a hora de chegada final do path currente.
        procurarHora(NA,NB,ListaHorarios,HoraInicio,HoraMudancaLinha),
        tempo_de_chegada(T,HoraMudancaLinha,HoraUltimaParagem),
        HoraChegada=HoraUltimaParagem.

getHorariosFromPath(Path,HorariosFormatted):-
        findall(Horario,horario(Path,_,Horario),ListaHorarios),
        appendHorarios(ListaHorarios,AppendedList),
        HorariosFormatted = AppendedList.

appendHorarios([],[]):-!.
appendHorarios([(_,H)|T],[H|AppendedList]):-
        appendHorarios(T,AppendedList),!.


procurarHora( _, [], _, _):- write('ERRO: Não foi encontrada uma hora de partida a partir da hora indicada!').

%N: Posição do ponto de chegada na lista completa do percurso.
%H: Primeiro horário disponivel para o percurso.
%T: Restantes dos horários do percurso.
%HoraInicio: Hora definida para iniciar a viagem
%HoraChegada: Hora de chegada ao ponto B
procurarHora(NA,NB, [H|T], HoraInicio,HoraChegada):-
        %nth1 encontra coloca na variavel HoraInicial o tempo que está na primeira posição da lista H.
        nth1(NA,H,HoraInicial),
        %Se a hora Inicial da viagem for maior do que a Hora de inicio definida, então continua o predicado, senão, volta a chamar o predicado apenas com os horários restantes.
        %nth1 encontra a hora de chegada ao ponto B, sendo N a posição do ponto B na lista H. Esta informação é guardada na HoraChegada.
        ((HoraInicio=<HoraInicial,nth1(NB,H,HoraChegada),!);(procurarHora(NA,NB,T,HoraInicio,HoraChegada))).



aStar(Orig,Dest,HoraInicio,Cam,HoraChegada):-
        (
                (aStar2(Dest,[(_,HoraInicio,[Orig])],Cam,HoraChegada))
        ;    
                (Cam=[],HoraChegada is -1)
        ),!.
        %postSolution(Orig,Dest,HoraInicio,HoraChegada,Cam).
    
aStar2(Dest,[(_,Chegada,[Dest|T])|_],Cam,Chegada):-
        reverse([Dest|T],Cam),!.
    
aStar2(Dest,[(_,HoraInicio,LA)|Outros],Cam,HoraChegada):-
        LA=[Act|_],
        findall((CEX,CaX,[X|LA]),
            (Dest\==Act,edge(Act,X,Path),\+member(X,LA),
            calcularTempo(Act,X,Path,HoraInicio,HoraParagem),
            CaX is HoraParagem, estimativa(X,Dest,EstX),
            CEX is CaX +EstX),Novos),
        append(Outros,Novos,Todos),
        sort(Todos,TodosOrd),
        aStar2(Dest,TodosOrd,Cam,HoraChegada).


bestfs(Orig,Dest,HoraInicio,Cam,HoraChegada):-
        bestfs2(Dest,(HoraInicio,[Orig]),Cam,HoraChegada),!.
    
bestfs2(Dest,(Chegada,[Dest|T]),Cam,Chegada):-
        reverse([Dest|T],Cam),!.
    
bestfs2(Dest,(HoraInicio,LA),Cam,HoraChegada):-
     LA=[Act|_],
     findall((EstX,CaX,[X|LA]),
        (edge(Act,X,Path),\+member(X,LA),
        calcularTempo(Act,X,Path,HoraInicio,HoraParagem),
        CaX is HoraParagem, estimativa(X,Dest,EstX))
        ,Novos),

     sort(Novos,NovosOrd),
     proximo(NovosOrd,CM,Melhor),
     bestfs2(Dest,(CM,Melhor),Cam,HoraChegada).


proximo([(_,CM,Melhor)|_],CM,Melhor).

proximo([_|L],CM,Melhor):-proximo(L,CM,Melhor). 



estimativa(Nodo1,Nodo2,Estimativa):-
        node(_,Nodo1,_,_,X1,Y1),
        node(_,Nodo2,_,_,X2,Y2),
        Degrees  is pi / 180,
        Distancia is acos(sin(X1*Degrees)*sin(X2*Degrees) + cos(X1*Degrees)*cos(X2*Degrees) * cos(Y2*Degrees-Y1*Degrees)) * 6371000,
        Estimativa is Distancia / 8.89.
    
    
    
calcularTempo(Act,X,Path, HoraInicio, HoraChegada):-
        line(Path,_,List,_),
        nth1(NAct,List,Act),
        nth1(NX,List,X),
        getHorariosFromPath(Path,LHorarios),
        calcularHora(NAct,NX,LHorarios,HoraInicio,HoraChegada).
    
    
    
calcularHora( _, _, [], _,_):- print('ERRO: Não foi encontrada uma hora de partida a partir da hora indicada!').
    
calcularHora(NAct,NX,[H|T],HoraInicio,HoraChegada):-
        nth1(NAct,H,HoraInicial),
        ((HoraInicio=<HoraInicial,nth1(NX,H,HoraChegada),!);(calcularHora(NAct,NX,T,HoraInicio,HoraChegada))).


postSolution(StartingNode,EndNode,LeavingTime,ArrivingTime,FullPath):-
        Term = json([startingNode=StartingNode,endNode=EndNode,leavingTime=LeavingTime,arrivingTime=ArrivingTime,fullPath=FullPath]),
        http_post('https://arqsi2020-grupo67.herokuapp.com/closestPath', json(Term), _, []).


plan_mud_mot(A,B,HoraInicial,Cam,HoraChegada):-
        findall(LCaminho,caminho(A,B,LCaminho),LLCaminho),
        get_time(Ti),
        mais_cedo_sem_findall(A,B,HoraInicial,Cam,HoraChegada),
        get_time(Tf),
        length(LLCaminho,NSol),
        TSol is Tf-Ti,
        write('Numero de Solucoes:'),write(NSol),nl,
        write('Tempo de geracao da solucao:'),write(TSol), write(' ms.'),nl.
        