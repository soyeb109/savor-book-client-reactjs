import { Slide } from "react-awesome-reveal";

const TestimonialSection = () => {
  return (
    <section className="bg-base-200 py-16 px-6 lg:px-24">
      <Slide direction="up" triggerOnce>
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <h3 className="text-4xl font-semibold text-indigo-600 dark:text-indigo-400">
            What Our Users Say
          </h3>
          <p className="text-base-content max-w-xl mx-auto text-lg">
            Recipes made simple, delicious, and fun! Hear from our amazing
            community who’ve discovered new favorites and transformed their
            cooking.
          </p>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {/* Card 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-base-content dark:text-gray-300 italic">
                "I love how easy it is to find and save recipes. The variety is
                amazing, and it’s helped me cook healthier meals for my family!"
              </p>
              <div className="mt-4 font-semibold text-indigo-600 dark:text-indigo-400">
                – Sarah K.
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-base-content dark:text-gray-300 italic">
                "The user interface is clean and intuitive. I can quickly add my
                own recipes and share them with friends. Highly recommend!"
              </p>
              <div className="mt-4 font-semibold text-indigo-600 dark:text-indigo-400">
                – James L.
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-base-content dark:text-gray-300 italic">
                "Finding inspiration for dinner used to be a struggle. This app
                makes it fun and exciting every day."
              </p>
              <div className="mt-4 font-semibold text-indigo-600 dark:text-indigo-400">
                – Emily R.
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </section>
  );
};

export default TestimonialSection;
