const { test, expect, chromium} = require("@playwright/test");
const { email, password } = require("../user");

test('Login in netology', async ({ page }) => {
  await page.goto('https://netology.ru/');

  await page.click('text=Войти');

  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');

  await page.waitForSelector('[data-testid="profile-programs-content"] h2');
  await expect(page.locator('[data-testid="profile-programs-content"] h2')).toHaveText('Моё обучение')
});

test('Incorrect login in netology', async ({ page }) => {

  await page.goto('https://netology.ru/');

  await page.click('text=Войти');

  await page.fill('[placeholder="Email"]', 'test@test.ru');
  await page.fill('[placeholder="Пароль"]', '12345qwert');


  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.locator('[data-testid="login-error-hint"]'))
      .toHaveText(/(Вы ввели неправильно логин или пароль.|Слишком много попыток, вход временно заблокирован. Попробуйте авторизоваться через 30 секунд.)/);
});