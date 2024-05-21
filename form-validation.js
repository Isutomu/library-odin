const title = document.querySelector("#bookTitle");
title.addEventListener("input", () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity("No title for the book!");
  } else {
    title.setCustomValidity("");
  }
  if (title.validity.tooLong) {
    title.setCustomValidity("Title too long!");
  } else {
    title.setCustomValidity("");
  }
});

const author = document.querySelector("#bookAuthor");
author.addEventListener("input", () => {
  if (author.validity.valueMissing) {
    author.setCustomValidity("No author for the book!");
  } else {
    author.setCustomValidity("");
  }
  if (author.validity.tooLong) {
    author.setCustomValidity("Name too long!");
  } else {
    author.setCustomValidity("");
  }
});

const pages = document.querySelector("#bookPages");
pages.addEventListener("input", () => {
  if (pages.validity.valueMissing) {
    pages.setCustomValidity("Book has no pages!");
  } else {
    pages.setCustomValidity("");
  }
  if (pages.validity.rangeOverflow) {
    pages.setCustomValidity("Book has too many pages!");
  } else {
    pages.setCustomValidity("");
  }
  if (!Number(pages.value)) {
    pages.setCustomValidity("Not a number!");
  }
});

const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("submit", (e) => {
  if (
    !(title.validity.valid && author.validity.valid && pages.validity.valid)
  ) {
    e.preventDefault();
  }
});
