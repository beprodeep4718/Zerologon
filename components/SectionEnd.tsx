export default function SectionEnd({ name, text }: { name: string; text: string }) {
  return (
    <footer className="wrap label flex flex-wrap justify-between gap-4 border-t border-rule py-7">
      <span>
        © {new Date().getFullYear()} {name}
      </span>
      <span>{text}</span>
    </footer>
  );
}
