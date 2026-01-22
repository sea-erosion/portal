export async function loadComponents() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  if (header) {
    const res = await fetch('components/header.html');
    header.innerHTML = await res.text();
  }

  if (footer) {
    const res = await fetch('components/footer.html');
    footer.innerHTML = await res.text();
  }
}
