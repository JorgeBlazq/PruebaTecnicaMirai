const { Given, When, Then } = require("@cucumber/cucumber");
import { test, expect } from '@playwright/test';
import { ICustomWorld } from '../custom-world';
import { DataTable } from '@cucumber/cucumber';

Given('An Empty todo list', async function (this: ICustomWorld) {
});

Given('A todo list with items:', async function (this: ICustomWorld, data: DataTable) {
  const page = this.page!;
  //Locator for input
  const input = page.locator('.new-todo').first();
  const items = data.raw();
  for (const item of items) {
    //Creamos una tarea por cada entrada en la tabla
    await input.fill(item[0]);
    await input.press('Enter');
  }
});

When('I add items:', async function (this: ICustomWorld, data: DataTable) {
  const page = this.page!;
  const input = page.locator('.new-todo').first();
  const items = data.raw();
  for (const item of items) {
    //Creamos una tarea por cada entrada en la tabla
    await input.fill(item[0]);
    await input.press('Enter');
  }
});

When('I delete item:', async function (this: ICustomWorld, data: DataTable) {
  const page = this.page!;
  const todos = page.locator('.todo');
  const items = data.raw();
  for (let i = 0; i < await todos.count(); i++) {
    for (const item of items) {
      if (await todos.nth(i).innerText() === item[0]) {
        await todos.nth(i).hover();
        await todos.nth(i).getByRole('button').click();
      }
    }
  }
});

When('I complete item:', async function (this: ICustomWorld, data: DataTable) {
  const page = this.page!;
  const todos = page.locator('.todo');
  const items = data.raw();
  for (let i = 0; i < await todos.count(); i++) {
    for (const item of items) {
      if (await todos.nth(i).innerText() === item[0]) {
        await todos.nth(i).getByRole('checkbox').check();
      }
    }
  }
});

When('I delete completed items', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.locator('.clear-completed').first().click();
});

When('I navigate to {string}', async function (this: ICustomWorld, filter: string) {
  const page = this.page!;
  await page.locator('.filters').getByText(filter).click();
});

When('I edit {string} into {string}', async function (this: ICustomWorld, todo: string, editedTodo: string) {
  const page = this.page!;
  const todos = page.locator('.todo');
  for (let i = 0; i < await todos.count(); i++) {
    if (await todos.nth(i).innerText() == todo) {
      await todos.nth(i).dblclick();
      await todos.nth(i).getByRole('textbox').fill(editedTodo);
      await todos.nth(i).press('Enter');
    }
  }
});

Then('I should see the title and footer', async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.locator('.info').first()).toBeVisible();
});

Then('Todo list contains:', async function (this: ICustomWorld, data: DataTable) {
  const page = this.page!;
  const todos = page.locator('.todo');
  const items = data.raw();
  for (let index = 0; index < await todos.count(); index++) {
    await expect(todos.nth(index)).toHaveText(items[index][0]);
  }
});

Then('Todo list doesnt contain items', async function (this: ICustomWorld) {
  const page = this.page!;
  const todos = page.locator('.todo');
  await expect(todos).toHaveCount(0);
});

Then('The following item shows as complete:', async function (this: ICustomWorld, data: DataTable) {
  const page = this.page!;
  const todos = page.locator('.todo');
  const items = data.raw();
  for (let index = 0; index < await todos.count(); index++) {
    for (const item of items) {
      if (await todos.nth(index).textContent() == item[0]) {
        await expect(todos.nth(index).getByRole('checkbox')).toBeChecked();
      }
    }
  }
});

Then('it shows {string}', async function (this: ICustomWorld, count: string) {
  const page = this.page!;
  await expect(page.locator('.todo-count').first()).toHaveText(count);
});

Then('Text box empties', async function (this: ICustomWorld) {
  const page = this.page!;
  await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty();
});





