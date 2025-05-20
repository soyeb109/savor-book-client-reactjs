import { Fade } from "react-awesome-reveal";

const WhyChooseUs = () => {
  return (
    <section className="bg-gradient-to-r from-amber-100 to-orange-200 dark:from-gray-900 dark:to-gray-800 py-20 px-6 lg:px-24 rounded-lg shadow-lg">
      <Fade cascade damping={0.2} triggerOnce>
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-amber-700 dark:text-amber-400 mb-4">
            Why Choose Savor Food?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            Discover the unique benefits that make our Recipe Book App your
            go-to cooking companion.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-amber-600 dark:text-amber-400 mb-4 text-5xl">
              🍳
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-700 dark:text-amber-300">
              Easy to Use
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Intuitive interface and smooth navigation let you find and add
              recipes effortlessly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-amber-600 dark:text-amber-400 mb-4 text-5xl">
              ❤️
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-700 dark:text-amber-300">
              Personalized Favorites
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Save, like, and organize your favorite recipes for easy access
              anytime.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-amber-600 dark:text-amber-400 mb-4 text-5xl">
              🌐
            </div>
            <h3 className="text-xl font-semibold mb-2 text-amber-700 dark:text-amber-300">
              Community Driven
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Join a growing community of food lovers sharing new recipes and
              ideas.
            </p>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default WhyChooseUs;
