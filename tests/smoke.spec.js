const { expect, test } = require("@playwright/test");

const routes = [
  "/",
  "/projects/advocacia/",
  "/projects/personal-trainer/",
  "/projects/odontologia/",
  "/projects/imobiliaria/",
];

for (const route of routes) {
  test(`${route} carrega sem erros criticos`, async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(route);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
}

test("ancoras principais da home navegam", async ({ page }) => {
  await page.goto("/");

  for (const fragment of ["sobre", "servicos", "processo", "projetos", "contato"]) {
    await expect(page.locator(`#${fragment}`)).toHaveCount(1);
  }
});

test("carrossel do hero navega, repete e responde ao teclado", async ({ page }) => {
  await page.goto("/");

  const carousel = page.locator(".project-carousel");
  const activeTitle = () => carousel.locator(".project-slide.is-active figcaption strong");

  await expect(activeTitle()).toHaveText("Personal Trainer");
  await expect(carousel.locator("a")).toHaveCount(0);

  await carousel.locator(".project-carousel__button--next").click();
  await expect(activeTitle()).toHaveText("Fotografia");

  await carousel.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(activeTitle()).toHaveText("Personal Trainer");

  await page.keyboard.press("ArrowLeft");
  await expect(activeTitle()).toHaveText("JelleWeb");

  await carousel.locator(".project-carousel__button--next").click();
  await expect(activeTitle()).toHaveText("Personal Trainer");
});

test("hero permanece responsivo sem overflow horizontal", async ({ page }) => {
  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const metrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(metrics.scrollWidth).toBe(metrics.clientWidth);
    await expect(page.locator(".project-carousel")).toBeVisible();
  }
});

test("baseline visual das paginas publicadas", async ({ page }, testInfo) => {
  const route = testInfo.project.name === "mobile" ? "/projects/advocacia/" : "/";
  await page.goto(route);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page).toHaveScreenshot(`${testInfo.project.name}-baseline.png`, {
    fullPage: true,
    animations: "disabled",
  });
});
