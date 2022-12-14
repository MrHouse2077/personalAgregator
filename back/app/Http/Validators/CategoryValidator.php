<?php

    namespace App\Http\Validators;
    
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Validator;
    
    class CategoryValidator {

        public static function categoryDelete($request) {
            return Validator::make($request->all(),[
                                                        'category_id' => 'required|integer',
                                                    ],
                                                    [
                                                        'category_id.required' => 'Ошибка',
                                                        'category_id.integer' => 'Ошибка',
                                                    ]
            );
        }
    }
