function Choice({ question, setter }) {
  return (
    <div>
      {question.att.map((el, i) => (
        <button className="btn btn-outline m-4 h-[100px] w-[180px]" key={`btn${el.title}${i}`} onClick={() => setter(question.ref)}>
          <div className="flex flex-col text-lg">
            <div>{el.title}:</div>
            <div className="text-xs">{el.subtitle}</div>
          </div>
        </button>
      ))}
    </div>
  );
  s;
}

export default Choice;
