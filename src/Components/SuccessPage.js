import React from "react";

function SuccessPage({ formdata }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Form Submission Successful!
        </h1>
        <p className="text-lg text-center text-gray-700 mb-4">
          Thank you for submitting the form. Here are the details you provided:
        </p>
        <div className="space-y-4">
          {Object.entries(formdata).map(
            ([key, value]) =>
              key !== "pass" && (
                <div
                  key={key}
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm"
                >
                  <span className="font-semibold text-gray-600">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>
                  <span className="text-gray-900">{value}</span>
                </div>
              )
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
