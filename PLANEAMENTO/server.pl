:- consult('HTTP_Reader').
:- consult('BC_Viagens').
:- consult('GeneticAlgorithms').

:- module(server,
      [ server/1            % ?Port
      ]).

:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_files)).
:- use_module(library(http/http_unix_daemon)).
:- use_module(library(http/http_log)).
:- use_module(library(http/http_dyn_workers)).
:- http_handler(root(.), http_reply_from_files('.', []), [prefix]).

server(Port) :-
    http_server(http_dispatch,
                [ port(Port),
                  workers(16)
                ]).

:- http_handler('/line', getLine, []).
:- http_handler('/gera', geraP, []).

server(Port) :-
        http_server(http_dispatch, [ port(Port), workers(16) ]).

getLine(Request) :-
        http_parameters(Request,
                        [ origem(Origem, []),
                        destino(Destino, [])
                        ]),
        format('Content-type: text/plain~n~n'),
        term_string(A,Origem),
        term_string(B,Destino),
        getLines,
        line(A,B,C,D),
        format('Origem: ~w | Destino: ~w~nLinha: ~w~nHorario:~w',[Origem,Destino,C,D]).

geraP(Request) :-
        http_parameters(Request,
                        [ ng(NG,[integer]),
                        dp(DP,[integer]),
                        pc(PC,[integer]),
                        pm(PM,[integer]),
                        t(T,[integer]),
                        av(Av,[integer]),
                        g(G,[integer])
                        ]),
        geraCloud(NG,DP,PC,PM,T,Av,G).