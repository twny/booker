import Clerk from "@clerk/clerk-js";
const publishableKey = "pk_test_cHJlY2lvdXMtcmVwdGlsZS0zMy5jbGVyay5hY2NvdW50cy5kZXYk";
const clerk = new Clerk(publishableKey);
await clerk.load({
  // Set load options here...
});
export async function createUser(userId: string, email: string | undefined) {
  // TODO: Header with bearer token is only needed in dev mode (some cors issue), maybe there is a better way to do this
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${await clerk.session?.getToken()}`},
    body: JSON.stringify({userId: userId, email: email})
  });

  if (response.status === 201) {
    // TODO: do something useful here
    console.log("User created")
  } else if (response.status === 409) {
    console.log("User already exists")
  }
}

export default clerk;