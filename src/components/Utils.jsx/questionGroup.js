// const compList = [
//   { component: "Salesforce", componentShort: "salesforce" },
//   { component: "Hubspot", componentShort: "hubspot" },
//   { component: "Amp", componentShort: "amp" },
// ];

export function createTypeform(title, compList, personas) {
  //   console.log({ compList });
  const techCompareForm = {
    type: "quiz",
    title: title,
    workspace: {
      href: "https://api.typeform.com/workspaces/hXm3e8",
    },
    theme: {
      href: "https://api.typeform.com/themes/qHWOQ7",
    },
    settings: {
      language: "en",
      progress_bar: "proportion",
      meta: {
        allow_indexing: false,
      },
      hide_navigation: false,
      is_public: true,
      is_trial: false,
      show_progress_bar: true,
      show_typeform_branding: false,
      are_uploads_public: false,
      show_time_to_complete: true,
      show_number_of_submissions: false,
      show_cookie_consent: false,
      show_question_number: true,
      show_key_hint_on_choices: true,
      autosave_progress: true,
      free_form_navigation: false,
      use_lead_qualification: false,
      pro_subdomain_enabled: false,
      capabilities: {
        e2e_encryption: {
          enabled: false,
          modifiable: false,
        },
      },
    },
    thankyou_screens: [
      {
        ref: "default_tys",
        title: "Thanks for completing the\n" + title,
        type: "thankyou_screen",
        properties: {
          show_button: false,
          share_icons: false,
        },
        attachment: {
          type: "image",
          href: "https://images.typeform.com/images/2dpnUBBkz2VN",
        },
      },
    ],
    fields: [
      {
        title: "Select Persona",
        ref: "persona_compare",
        properties: {
          randomize: false,
          allow_multiple_selection: false,
          allow_other_choice: false,
          vertical_alignment: true,
          choices: [...personas],
        },
        validations: {
          required: false,
        },
        type: "multiple_choice",
        attachment: {
          type: "image",
          href: "https://images.typeform.com/images/WMALzu59xbXQ",
        },
      },
      {
        title: "Which of the following technology platforms do you use?",
        ref: "tech_selection",
        properties: {
          randomize: false,
          allow_multiple_selection: true,
          allow_other_choice: true,
          vertical_alignment: true,
          choices: [...compList],
        },
        validations: {
          required: true,
        },
        type: "multiple_choice",
      },
    ],
  };
  let questionGroups = createQuestionGroups(compList);
  let submitPage = [
    {
      title: "Thank you for completing the survey",
      ref: "submit_survey",
      properties: {
        button_text: "Submit",
        hide_marks: true,
      },
      type: "statement",
    },
  ];
  techCompareForm.fields = [
    ...techCompareForm.fields,
    ...questionGroups,
    ...submitPage,
  ];
  let questionLogic = createFullLogicSet(compList);
  techCompareForm.logic = questionLogic;
  //   console.log({ techCompareForm });
  return techCompareForm;
}

export function createQuestionGroups(componentList) {
  let tempList = componentList.map((item) => {
    let tempItem = {
      title: item.label,
      ref: `${item.ref}_group`,
      properties: {
        button_text: "Continue",
        show_button: true,
        fields: [
          {
            title: "How often do you use " + item.label + "?",
            ref: "frequency_" + item.ref,
            properties: {
              randomize: false,
              allow_multiple_selection: false,
              allow_other_choice: false,
              vertical_alignment: true,
              choices: [
                {
                  label: "Daily",
                },
                {
                  label: "Weekly",
                },
                {
                  label: "Bi-weekly",
                },
                {
                  label: "Monthly",
                },
                {
                  label: "Bi-monthly",
                },
              ],
            },
            validations: {
              required: true,
            },
            type: "multiple_choice",
          },
          {
            title: "Please rate your user experience.",
            ref: "uxrating_" + item.ref,
            properties: {
              description:
                "Ease of use, customization, performance, and mobile optimization",
              start_at_one: true,
              steps: 5,
              labels: {
                left: "Extremely dissatisfied",
                // center: "Neither satisfied nor dissatisfied",
                right: "Extremely satisfied",
              },
            },
            validations: {
              required: true,
            },
            type: "opinion_scale",
          },
          {
            title: "Why did you give it this score? ",
            ref: "uxfreetext_" + item.ref,
            properties: {},
            validations: {
              required: false,
            },
            type: "short_text",
          },
          {
            title:
              "Please rate your satisfaction with the tool's reporting capabilities.",
            ref: item.ref + "_q4",
            properties: {
              start_at_one: true,
              steps: 5,
              labels: {
                left: "Extremely dissatisfied",
                // center: "Neither satisfied nor dissatisfied",
                right: "Extremely satisfied",
              },
            },
            validations: {
              required: true,
            },
            type: "opinion_scale",
          },
          {
            title: "Why did you give it this score? ",
            ref: item.ref + "_q4_explainer",
            properties: {},
            validations: {
              required: false,
            },
            type: "short_text",
          },
          {
            title: "How would you rate the data's accuracy in this platform? ",
            ref: item.ref + "_q9",
            properties: {
              start_at_one: true,
              steps: 5,
              labels: {
                left: "Highly inaccurate",
                right: "Highly Accurate",
              },
            },
            validations: {
              required: true,
            },
            type: "opinion_scale",
          },
          {
            title: "Why did you give it this score?",
            ref: item.ref + "_q9_explainer",
            properties: {},
            validations: {
              required: false,
            },
            type: "short_text",
          },
        ],
      },
      type: "group",
      layout: {
        attachment: {
          type: "image",
          href: "https://images.typeform.com/images/WMALzu59xbXQ",
        },
        type: "stack",
        viewport_overrides: {},
      },
    };
    return tempItem;
  });
  return tempList;
}

export function createLogic(componentList) {
  let logicList = [];
  let explainerList = [];
  let fieldLogic, explainerLogic;

  let item = componentList.shift();
  //   let explainerJumpList = [];
  //   let lastItem = componentList[componentList.length - 1];
  let tempJumps = [];

  let compLength = componentList.length;
  //   let tempComp = componentList
  for (let i = 0; i < compLength; i++) {
    // if (!componentList) return;

    // explainerJumpList = [...explainerJumpList, tempExplainerJumps];
    // if (compLength == i) return addJumpsToList(tempJumps, item);

    // console.log(componentList[0]);
    // let tempLogic;
    // if (componentList[0] != undefined)
    let tempLogic = {
      action: "jump",
      details: {
        to: {
          type: "field",
          value: "frequency_" + componentList[0].ref,
        },
      },
      condition: {
        op: "and",
        vars: [
          {
            op: "lower_than",
            vars: [
              {
                type: "field",
                value: item.ref + "_q9",
              },
              {
                type: "constant",
                value: 5,
              },
            ],
          },
          {
            op: "greater_than",
            vars: [
              {
                type: "field",
                value: item.ref + "_q9",
              },
              {
                type: "constant",
                value: 1,
              },
            ],
          },
          {
            op: "is",
            vars: [
              {
                type: "field",
                value: "tech_selection",
              },
              {
                type: "choice",
                value: componentList[0].ref,
              },
            ],
          },
        ],
      },
    };

    logicList.push(tempLogic);

    let tempExplainer = {
      action: "jump",
      details: {
        to: {
          type: "field",
          value: "frequency_" + componentList[0].ref,
        },
      },
      condition: {
        op: "is",
        vars: [
          {
            type: "field",
            value: "tech_selection",
          },
          {
            type: "choice",
            value: componentList[0].ref,
          },
        ],
      },
    };

    explainerList.push(tempExplainer);

    let logicEnding = [
      {
        action: "jump",
        details: {
          to: {
            type: "field",
            value: "submit_survey",
          },
        },
        condition: {
          op: "and",
          vars: [
            {
              op: "lower_than",
              vars: [
                {
                  type: "field",
                  value: item.ref + "_q9",
                },
                {
                  type: "constant",
                  value: 5,
                },
              ],
            },
            {
              op: "greater_than",
              vars: [
                {
                  type: "field",
                  value: item.ref + "_q9",
                },
                {
                  type: "constant",
                  value: 1,
                },
              ],
            },
          ],
        },
      },
      {
        action: "jump",
        details: {
          to: {
            type: "field",
            value: item.ref + "_q9_explainer",
          },
        },
        condition: {
          op: "always",
          vars: [],
        },
      },
    ];

    const explainerEnding = {
      action: "jump",
      details: {
        to: {
          type: "field",
          value: "submit_survey",
        },
      },
      condition: {
        op: "always",
        vars: [],
      },
    };

    if (compLength - 1 == i) {
      logicList.push(logicEnding[0], logicEnding[1]);
      console.log({ logicList });
      fieldLogic = {
        type: "field",
        ref: item.ref + "_q9",
        actions: logicList,
      };
      //   tempJumps = tempJump;
      //   explainerJumps = tempJumps;
      explainerList.push(explainerEnding);
      explainerLogic = {
        type: "field",
        ref: item.ref + "_q9_explainer",
        actions: explainerList,
      };
      addJumpsToList(tempJumps, item);
    }
    componentList.shift();
  }
  tempJumps.push(fieldLogic, explainerLogic);
  const logic = tempJumps;
  //   tempExplainerJumps.push(fieldLogic);
  //   tempExplainerJumps.push(explainerLogic);
  //   console.log({ logic });
  return logic;
}

export function createFullLogicSet(compList) {
  //   let compLength = compList.length;
  //   let fullLogicList = [];

  //   for (let i = 0; i < compLength; i++) {
  //     let tempList = [...compList];
  //     if (i) tempList = compList.splice(0, i);
  //     console.log({ tempList });
  //     tempList = createLogic(tempList);
  //     fullLogicList.push(tempList);
  //   }
  //   console.log({ fullLogicList });

  let tempList = compList.map((comp, index) => {
    // let helperList = compList;
    // if (index > 0) return compList.slice(index);
    return createLogic(compList.slice(index));
  });
  let initialAction = {
    action: "jump",
    details: {
      to: {
        type: "field",
        value: "frequency_" + compList[0].ref,
      },
    },
    condition: {
      op: "is",
      vars: [
        {
          type: "field",
          value: "tech_selection",
        },
        {
          type: "choice",
          value: compList[0].ref,
        },
      ],
    },
  };
  //   console.log(
  //     tempList[0].filter((item) => {
  //       return item.ref == compList[0].ref + "_q9_explainer";
  //     })
  //   );
  //   console.log(compList[0].ref + "_q9_explainer");
  let temp1InitialLogic = tempList[0].filter((item) => {
    return item.ref == compList[0].ref + "_q9_explainer";
  })[0];
  let tempInitialLogic = JSON.parse(JSON.stringify(temp1InitialLogic));
  //   tempInitialLogic = tempInitialLogic[0][1];
  //   console.log({ tempInitialLogic });
  tempInitialLogic.ref = "tech_selection";
  let tempActions = tempInitialLogic.actions;
  tempActions.unshift(initialAction);
  //   tempInitialLogic.actions.unshift(initialAction);
  //   console.log({ tempInitialLogic });

  tempList.pop();
  tempList.unshift(tempInitialLogic);

  let lastComponentJumps = [
    {
      type: "field",
      ref: compList[compList.length - 1].ref + "_q9",
      actions: [
        {
          action: "jump",
          details: {
            to: {
              type: "field",
              value: "submit_survey",
            },
          },
          condition: {
            op: "and",
            vars: [
              {
                op: "lower_than",
                vars: [
                  {
                    type: "field",
                    value: compList[compList.length - 1].ref + "_q9",
                  },
                  {
                    type: "constant",
                    value: 5,
                  },
                ],
              },
              {
                op: "greater_than",
                vars: [
                  {
                    type: "field",
                    value: compList[compList.length - 1].ref + "_q9",
                  },
                  {
                    type: "constant",
                    value: 1,
                  },
                ],
              },
            ],
          },
        },
        {
          action: "jump",
          details: {
            to: {
              type: "field",
              value: compList[compList.length - 1].ref + "_q9_explainer",
            },
          },
          condition: {
            op: "always",
            vars: [],
          },
        },
      ],
    },
  ];
  console.log();
  addJumpsToList(lastComponentJumps, compList[compList.length - 1]);
  tempList.push(lastComponentJumps);
  tempList = tempList.flat(1);
  //   console.log({ tempList });
  return tempList;
}

function addJumpsToList(list, item) {
  return list.push(
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q2",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q1",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q1",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "field",
    //   ref: item.ref + "_q2",
    //   actions: [
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q3",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q2",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q2",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "field",
    //   ref: item.ref + "_q3",
    //   actions: [
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q4",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q3",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q3",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    {
      type: "field",
      ref: item.ref + "_q4",
      actions: [
        {
          action: "jump",
          details: {
            to: {
              type: "field",
              value: item.ref + "_q9",
            },
          },
          condition: {
            op: "and",
            vars: [
              {
                op: "lower_than",
                vars: [
                  {
                    type: "field",
                    value: item.ref + "_q4",
                  },
                  {
                    type: "constant",
                    value: 5,
                  },
                ],
              },
              {
                op: "greater_than",
                vars: [
                  {
                    type: "field",
                    value: item.ref + "_q4",
                  },
                  {
                    type: "constant",
                    value: 1,
                  },
                ],
              },
            ],
          },
        },
        {
          action: "jump",
          details: {
            to: {
              type: "field",
              value: item.ref + "_q4_explainer",
            },
          },
          condition: {
            op: "always",
            vars: [],
          },
        },
      ],
    },
    // {
    //   type: "field",
    //   ref: item.ref + "_q5",
    //   actions: [
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q6",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q5",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q5",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "field",
    //   ref: item.ref + "_q6",
    //   actions: [
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q7",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q6",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q6",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "field",
    //   ref: item.ref + "_q7",
    //   actions: [
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q8",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q7",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q7",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: "field",
    //   ref: item.ref + "_q8",
    //   actions: [
    //     {
    //       action: "jump",
    //       details: {
    //         to: {
    //           type: "field",
    //           value: item.ref + "_q9",
    //         },
    //       },
    //       condition: {
    //         op: "and",
    //         vars: [
    //           {
    //             op: "lower_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q8",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 5,
    //               },
    //             ],
    //           },
    //           {
    //             op: "greater_than",
    //             vars: [
    //               {
    //                 type: "field",
    //                 value: item.ref + "_q8",
    //               },
    //               {
    //                 type: "constant",
    //                 value: 1,
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // },
    {
      type: "field",
      ref: "uxrating_" + item.ref,
      actions: [
        {
          action: "jump",
          details: {
            to: {
              type: "field",
              value: item.ref + "_q4",
            },
          },
          condition: {
            op: "and",
            vars: [
              {
                op: "lower_than",
                vars: [
                  {
                    type: "field",
                    value: "uxrating_" + item.ref,
                  },
                  {
                    type: "constant",
                    value: 5,
                  },
                ],
              },
              {
                op: "greater_than",
                vars: [
                  {
                    type: "field",
                    value: "uxrating_" + item.ref,
                  },
                  {
                    type: "constant",
                    value: 1,
                  },
                ],
              },
            ],
          },
        },
        {
          action: "jump",
          details: {
            to: {
              type: "field",
              value: "uxfreetext_" + item.ref,
            },
          },
          condition: {
            op: "always",
            vars: [],
          },
        },
      ],
    }
  );
}
