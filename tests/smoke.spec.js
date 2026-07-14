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

test("baseline visual das paginas publicadas", async ({ page }, testInfo) => {
  const route = testInfo.project.name === "mobile" ? "/projects/advocacia/" : "/";
  await page.goto(route);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page).toHaveScreenshot(`${testInfo.project.name}-baseline.png`, {
    fullPage: true,
    animations: "disabled",
  });
});
