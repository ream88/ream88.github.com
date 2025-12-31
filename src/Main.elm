module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (class, href, rel, target)
import Process
import Random
import Task
import Time



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }



-- MODEL


type alias Command =
    { command : String
    , output : Int -> Html Msg
    }


type Phase
    = WaitingToStart
    | Typing
    | PausingAfterCommand
    | Complete


type alias Model =
    { commands : List Command
    , currentCommandIndex : Int
    , typedChars : Int
    , phase : Phase
    , currentYear : Int
    }


commands : List Command
commands =
    [ { command = "whoami"
      , output = \_ -> text "Mario Uher"
      }
    , { command = "uptime"
      , output = \year -> text ("up " ++ String.fromInt (year - 1988) ++ " years")
      }
    , { command = "cat more.txt"
      , output =
            \_ ->
                span []
                    [ a [ href "https://twitter.com/ream88", target "_blank", rel "noopener noreferrer" ] [ text "Twitter" ]
                    , br [] []
                    , a [ href "https://github.com/ream88", target "_blank", rel "noopener noreferrer" ] [ text "GitHub" ]
                    , br [] []
                    , a [ href "https://www.linkedin.com/in/ream88/", target "_blank", rel "noopener noreferrer" ] [ text "LinkedIn" ]
                    ]
      }
    ]


init : () -> ( Model, Cmd Msg )
init _ =
    ( { commands = commands
      , currentCommandIndex = 0
      , typedChars = 0
      , phase = WaitingToStart
      , currentYear = 2024
      }
    , Cmd.batch
        [ Task.perform GotTime Time.now
        , delay 1000 StartTyping
        ]
    )



-- UPDATE


type Msg
    = GotTime Time.Posix
    | StartTyping
    | TypeChar
    | GotRandomDelay Int
    | FinishCommand
    | NextCommand


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotTime posix ->
            let
                year =
                    Time.toYear Time.utc posix
            in
            ( { model | currentYear = year }, Cmd.none )

        StartTyping ->
            ( { model | phase = Typing }
            , Random.generate GotRandomDelay (Random.int 50 250)
            )

        GotRandomDelay delay_ ->
            ( model, delay (toFloat delay_) TypeChar )

        TypeChar ->
            case getCurrentCommand model of
                Nothing ->
                    ( { model | phase = Complete }, Cmd.none )

                Just cmd ->
                    if model.typedChars >= String.length cmd.command then
                        ( { model | phase = PausingAfterCommand }
                        , Random.generate (\_ -> FinishCommand) (Random.int 250 500)
                        )

                    else
                        ( { model | typedChars = model.typedChars + 1 }
                        , Random.generate GotRandomDelay (Random.int 50 250)
                        )

        FinishCommand ->
            ( model, delay 500 NextCommand )

        NextCommand ->
            let
                nextIndex =
                    model.currentCommandIndex + 1
            in
            if nextIndex >= List.length model.commands then
                -- Increment index so last command renders as "completed"
                ( { model
                    | currentCommandIndex = nextIndex
                    , phase = Complete
                  }
                , Cmd.none
                )

            else
                ( { model
                    | currentCommandIndex = nextIndex
                    , typedChars = 0
                    , phase = Typing
                  }
                , delay 1000 StartTyping
                )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        (List.concat
            [ viewCompletedCommands model
            , viewCurrentCommand model
            , viewFinalPrompt model
            ]
        )


viewCompletedCommands : Model -> List (Html Msg)
viewCompletedCommands model =
    model.commands
        |> List.take model.currentCommandIndex
        |> List.concatMap (viewCompletedCommand model.currentYear)


viewCompletedCommand : Int -> Command -> List (Html Msg)
viewCompletedCommand year cmd =
    [ viewPrompt
    , span [ class "Command" ]
        [ text cmd.command
        , br [] []
        , cmd.output year
        ]
    , br [] []
    ]


viewCurrentCommand : Model -> List (Html Msg)
viewCurrentCommand model =
    case getCurrentCommand model of
        Nothing ->
            []

        Just cmd ->
            let
                typedText =
                    String.left model.typedChars cmd.command

                isComplete =
                    model.phase == PausingAfterCommand
            in
            [ viewPrompt
            , span [ class "Command" ]
                (if isComplete then
                    [ text cmd.command
                    , br [] []
                    , cmd.output model.currentYear
                    ]

                 else
                    [ text typedText
                    , viewCursor
                    ]
                )
            , br [] []
            ]


viewFinalPrompt : Model -> List (Html Msg)
viewFinalPrompt model =
    if model.phase == Complete then
        [ viewPrompt
        , viewCursor
        ]

    else
        []


viewPrompt : Html Msg
viewPrompt =
    span [] [ text "> " ]


viewCursor : Html Msg
viewCursor =
    span [ class "Cursor" ] [ text "|" ]



-- HELPERS


getCurrentCommand : Model -> Maybe Command
getCurrentCommand model =
    model.commands
        |> List.drop model.currentCommandIndex
        |> List.head


delay : Float -> Msg -> Cmd Msg
delay ms msg =
    Process.sleep ms
        |> Task.perform (\_ -> msg)
