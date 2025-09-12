import { Locator, Page } from "@playwright/test";
export async function scrollToBottom(page: Page, scrollbar: Locator) {
  await scrollbar.evaluate(
    (element: HTMLElement) => (element.scrollTop = element.scrollHeight)
  );
}
// window
// export async function scrollToBottom(page: Page) {
//   await page.evaluate(() => {
//     window.scrollTo(0, document.body.scrollHeight);
//   });
// }

// table body
// export async function scrollToBottom(page: Page) {
//   await page.evaluate(() => {
//     const tableBody = document.querySelector(".ant-table-body");
//     if (tableBody) {
//       tableBody.scrollTop = tableBody.scrollHeight;
//     }
//   });
// }
