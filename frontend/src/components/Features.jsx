const Features = () => {
  return (
    <div className="text-center p-5">
      <h2 className="text-2xl font-bold mb-5">OUR FEATURES</h2>
      <div className="flex justify-around">
        <div className="w-1/3 m-2 p-5 border border-gray-300 rounded-lg shadow-lg">
          <img src="https://www.shutterstock.com/shutterstock/photos/1855389154/display_1500/stock-vector-export-import-icon-logistic-traffic-symbol-vector-logo-template-1855389154.jpg" alt="Import and Export templates" className="w-24 h-24 object-cover rounded-full mx-auto" />
          <h3 className="text-xl font-semibold mt-3">Import and Export templates</h3>
          <p className="mt-2">You can share your newsletter templates with any other Mailchimp user with a simple click.</p>
        </div>
        <div className="w-1/3 m-2 p-5 border border-gray-300 rounded-lg shadow-lg">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHd0pH9RPmtnmkfseWFJnXIqz97uREL2U4hg&s" alt="Preview campaigns" className="w-24 h-24 object-cover rounded-full mx-auto" />
          <h3 className="text-xl font-semibold mt-3">Preview campaigns</h3>
          <p className="mt-2">Preview your campaigns on various devices, and make sure it's perfect.</p>
        </div>
        <div className="w-1/3 m-2 p-5 border border-gray-300 rounded-lg shadow-lg">
          <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/schedule-campaigns-760996.png" alt="Schedule campaigns" className="w-24 h-24 object-cover rounded-full mx-auto" />
          <h3 className="text-xl font-semibold mt-3">Schedule campaigns</h3>
          <p className="mt-2">Send your campaign instantly, or schedule it for the future.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;