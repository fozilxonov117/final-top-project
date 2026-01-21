import { MedalCounter, MedalCounterAlt } from 'features/operator-ranking';

export const MedalCounterDemo = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-8">Medal Counter Designs</h1>
      
      <div className="space-y-8">
        {/* Original Design - Now with Star and TOP text */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Option 1: Star Badge Design (Current)</h2>
          <div className="flex gap-4 items-center">
            <MedalCounter count={1} />
            <MedalCounter count={2} />
            <MedalCounter count={5} />
            <MedalCounter count={12} />
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Features: Golden star with "TOP" text, separate count number, hover animations, glow effects
          </p>
        </div>

        {/* Alternative Design */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Option 2: Modern Badge Design</h2>
          <div className="flex gap-4 items-center">
            <MedalCounterAlt count={1} />
            <MedalCounterAlt count={2} />
            <MedalCounterAlt count={5} />
            <MedalCounterAlt count={12} />
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Features: Trophy icon, integrated design, sliding shine effect, sparkle animations
          </p>
        </div>

        {/* Side by side comparison */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Side by Side Comparison</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="mb-2">
                <MedalCounter count={3} />
              </div>
              <p className="text-gray-400 text-sm">Star Badge Style</p>
            </div>
            <div className="text-center">
              <div className="mb-2">
                <MedalCounterAlt count={3} />
              </div>
              <p className="text-gray-400 text-sm">Modern Badge Style</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
