

const FAQ = () => {
    return (
        <div className="bg-pattern bg-cover bg-no-repeat py-14">
            <div className="container mx-auto">
                <div className="w-11/12 lg:w-10/12 mx-auto flex flex-col md:flex-row md:justify-around items-center gap-7 md:gap-0">
                    <h2 className="uppercase text-font_primary font-bold text-[50px] font-lato">Have A Questions? <br />We’ve got Answers!</h2>
                    <button className={`btn bg-font_tertiary text-font_primary hover:bg-font_primary hover:text-font_tertiary font-lato px-7 font-bold text-base border-none`}>BROWSE FAQS</button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;