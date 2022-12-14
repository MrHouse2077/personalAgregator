<?php

    namespace App\Http\Validators;
    
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Validator;
    
    class FeedbackValidator {

        public static function feedbackCheck($request) {
            return Validator::make($request->all(),[
                                                        'name' => 'required|min:2',
                                                        'email' => 'required|email:rfc,dns',
                                                        'msg' => 'required|min:3',
                                                    ],
                                                    [
                                                        'name.required' => 'Введите имя!',
                                                        'name.min:2' => 'Имя должно содержать более 1 символа!',
                                                        'email.email:rfc,dns' => 'Введите почту!',
                                                        'msg.required' => 'Введите сообщение!',
                                                        'msg.min:4' => 'Сообщение должно содержать более 3 символов!!',

                                                    ]
            );
        }
    }
