export const formQuestions = [
  {
    type: "choice",
    label: "How large is your company",
    att: [
      {
        title: "Small",
        subtitle: "Less than 300",
      },
      {
        title: "Medium",
        subtitle: "300 to 1000",
      },
      {
        title: "Large",
        subtitle: "Greater than 1000",
      },
    ],
    ref: "size",
  },
  {
    type: "text",
    label: "Please enter your name",
    att: "",
    ref: "name",
  },
  {
    type: "email",
    label: "Please enter your email",
    att: "",
    ref: "email",
  },
];
