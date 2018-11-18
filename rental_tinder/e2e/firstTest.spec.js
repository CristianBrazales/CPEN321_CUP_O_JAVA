describe('Example', () => {
  // this will restart the application to a initial state
  beforeEach(async () => {
    await device.reloadReactNative();
  });
// in case we are in the login screen check for its buttons
  it('restart app: should have login button', async () => {

  await expect(element(by.text('Log In'))).toBeVisible();
  });
  // test of sign up click on the sign up button and check we are actually moving
  it('change screen : should go to signup and check', async () => {
await element(by.text('Sign Up')).tap();
await expect(element(by.text('Submit!'))).toBeVisible();
});
// check the log in functionality, first restart the application
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  // check for correctness in the restart
  it(' restart: should have login button', async () => {
  await expect(element(by.text('Log In'))).toBeVisible();

  });
it(' restart: should change the password  and username entries', async () => {
  await element(by.text('password')).tap();
  await element(by.text('password')).typeText('Cristian123');
  await element(by.text('username')).tap();
  await element(by.text('username')).typeText('Cristian');
  await element(by.text('Log In')).tap();
await waitFor(element(by.text('Log out'))).toBeVisible().withTimeout(2000);
});
it(' should be in the log in area', async () => {
await waitFor(element(by.text('Log out'))).toBeVisible().withTimeout(2000);

});
})
