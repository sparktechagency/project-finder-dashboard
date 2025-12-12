export default function DeleteAccount() {
  return (
    <div className="max-w-2xl mx-auto overflow-y-scroll h-[80vh] my-10">
      <h1 className="text-xl font-medium text-gray-800 my-5">
        How to Delete Your Account
      </h1>

      <div>
        <h1 className="text-xl font-medium">Step 1: Open Your Profile Page</h1>
        <br />
        <img
          src="/home.png"
          alt="Home Page"
          style={{ width: "300px", marginTop: "8px" }}
        />
      </div>

      <div className="my-10">
        <h1 className="text-xl font-medium">Step 2: Click on delete account</h1>
        <br />
        <img
          src="/profile.png"
          alt="Profile Page"
          style={{ width: "300px", marginTop: "8px" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h1 className="text-xl font-medium">
          Step 3: Enter your current password and click on delete
        </h1>
        <br />
        <img
          src="/delete.png"
          alt="Delete Account Button"
          style={{ width: "300px", marginTop: "8px" }}
        />
      </div>

      <h1 className="text-xl font-medium mt-5">
        Your Account Deleted Successfully
      </h1>
    </div>
  );
}
