// Accounts that exist from the start. Admin login: admin@skypark.com / Admin@123
// passwordHash is made by hashPassword(email, password) in utils/crypto.js.
// Never write a real password here.
var seedUsers = [
  {
    userId: 1,
    name: "Admin",
    email: "admin@skypark.com",
    phone: "9000000000",
    passwordHash:
      "4f5b1bdbff9ca431b5af14901ac882ff81145e1ee8691aca509968cdc2379da4",
    role: "admin",
    addresses: [],
  },
];

export default seedUsers;
