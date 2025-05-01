import OptionsHolder from "./OptionsHolder";



const PreliminaryQuestionOne = () => {
    const languageOptions = ["Yorùbá", "Ibo", "Efik", "Hausa"];

    return(
        <div>

    <section>
    <div className="p-6">
      <OptionsHolder 
        options={languageOptions} 
        columns={2}
        initialSelected="Yorùbá"
      />
    </div>
    </section>
    </div>
    )
}

export default PreliminaryQuestionOne;