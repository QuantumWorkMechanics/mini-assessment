                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "submit_survey"
                        }
                    },
                    "condition": {
                        "op": "and",
                        "vars": [
                            {
                                "op": "lower_than",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "salesforce_q9"
                                    },
                                    {
                                        "type": "constant",
                                        "value": 5
                                    }
                                ]
                            },
                            {
                                "op": "greater_than",
                                "vars": [
                                    {
                                        "type": "field",
                                        "value": "salesforce_q9"
                                    },
                                    {
                                        "type": "constant",
                                        "value": 1
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "action": "jump",
                    "details": {
                        "to": {
                            "type": "field",
                            "value": "salesforce_q9_explainer"
                        }
                    },
                    "condition": {
                        "op": "always",
                        "vars": []
                    }
                }