# Lista Narzędzi IDE Agenta

Poniżej znajduje się kompletna lista wszystkich narzędzi, które mogę uruchamiać z tego IDE wraz z opisem, ograniczeniami i przykładami użycia.

---

## 1. codebase_search
**Co robi:** Przeprowadza semantyczne wyszukiwanie kodu, które znajduje fragmenty kodu na podstawie znaczenia, a nie dokładnego tekstu. Umożliwia eksplorację nieznanej bazy kodu poprzez zadawanie pytań typu "jak/gdzie/co".

**Ograniczenia/limity:**
- Działa tylko w ramach skonfigurowanych katalogów docelowych
- Może docelować tylko jeden katalog lub plik na raz (pusta lista przeszukuje całe repozytorium)
- Nie obsługuje wzorców glob ani wildcard
- Wyniki są ograniczone dla responsywności

**Przykład użycia:**
```
codebase_search(
  query="Jak działa autentyfikacja użytkownika w systemie?",
  target_directories=["src/auth/"]
)
```

---

## 2. run_terminal_cmd
**Co robi:** Wykonuje polecenia terminala w powłoce systemowej (PowerShell na Windows). Pozwala na uruchamianie skryptów, narzędzi CLI, testów i innych poleceń systemowych.

**Ograniczenia/limity:**
- Polecenia nie mogą wymagać interakcji użytkownika (wymagane flagi nieinteraktywne)
- Domyślnie inicjalizuje w katalogu głównym projektu
- Nie można aktualizować konfiguracji git
- Nie można uruchamiać destrukcyjnych poleceń git bez zgody użytkownika
- Nigdy nie pomijać hooków git bez zgody użytkownika

**Przykład użycia:**
```
run_terminal_cmd(
  command="npm test",
  is_background=false
)
```

---

## 3. grep
**Co robi:** Potężne narzędzie wyszukiwania oparte na ripgrep, które znajduje tekst w plikach przy użyciu wyrażeń regularnych. Obsługuje wyszukiwanie z kontekstem, liczenie wystąpień i filtrowanie według typu pliku.

**Ograniczenia/limity:**
- Wyniki są ograniczone dla responsywności
- Wzorce glob mogą być wolne jeśli są zbyt szerokie
- Domyślnie przeszukuje tylko pojedyncze linie (dla wielu linii użyj multiline=true)
- Respektuje .gitignore/.cursorignore

**Przykład użycia:**
```
grep(
  pattern="function\\s+\\w+Error",
  path="src/",
  output_mode="content",
  -C=3
)
```

---

## 4. delete_file
**Co robi:** Usuwa plik pod podaną ścieżką z lokalnego systemu plików.

**Ograniczenia/limity:**
- Operacja kończy się niepowodzeniem jeśli plik nie istnieje
- Może być odrzucona z powodów bezpieczeństwa
- Plik może być niemożliwy do usunięcia

**Przykład użycia:**
```
delete_file(
  target_file="src/temp-script.js"
)
```

---

## 5. fetch_rules
**Co robi:** Pobiera reguły dostarczone przez użytkownika, które pomagają w nawigacji po kodzie. Reguły zawierają informacje o kodzie, które mogą być wykorzystane do generowania lepszego kodu.

**Ograniczenia/limity:**
- Działa tylko z dostępnymi regułami zdefiniowanymi w sekcji <available_instructions>
- Nie można tworzyć nowych reguł tym narzędziem

**Przykład użycia:**
```
fetch_rules(
  rule_names=["typescript", "coding-style"]
)
```

---

## 6. web_search
**Co robi:** Wyszukuje informacje w internecie w czasie rzeczywistym. Użyteczne dla aktualnych informacji, które mogą nie być dostępne w danych treningowych, weryfikacji faktów lub informacji o bieżących wydarzeniach.

**Ograniczenia/limity:**
- Wymaga połączenia z internetem
- Wyniki zależą od dostępności usług wyszukiwania
- Może zwrócić nieaktualne lub niedokładne informacje

**Przykład użycia:**
```
web_search(
  search_term="TypeScript 5.8 new features 2025"
)
```

---

## 7. read_lints
**Co robi:** Czyta i wyświetla błędy lintera z bieżącego workspace'a. Pozwala sprawdzić problemy w konkretnych plikach, katalogach lub całym projekcie.

**Ograniczenia/limity:**
- Może zwracać błędy istniejące przed edycjami
- Nigdy nie należy wywoływać na plikach, które nie zostały edytowane
- Nie należy używać z bardzo szerokim zakresem plików

**Przykład użycia:**
```
read_lints(
  paths=["banking/banking.ts"]
)
```

---

## 8. edit_notebook
**Co robi:** Edytuje komórki w notebookach Jupyter. Obsługuje edycję istniejących komórek i tworzenie nowych komórek w różnych językach (Python, JavaScript, Markdown, itp.).

**Ograniczenia/limity:**
- Działa tylko z notebookami Jupyter
- Może zapisywać komórki Markdown jako "raw"
- Nie obsługuje usuwania komórek (można wyczyścić zawartość)
- old_string musi być unikalny w komórce
- Może zmienić tylko jedno wystąpienie na raz

**Przykład użycia:**
```
edit_notebook(
  target_notebook="analysis.ipynb",
  cell_idx=0,
  is_new_cell=true,
  cell_language="python",
  old_string="",
  new_string="import pandas as pd\nimport numpy as np"
)
```

---

## 9. todo_write
**Co robi:** Tworzy i zarządza ustrukturyzowaną listą zadań dla bieżącej sesji kodowania. Pomaga śledzić postępy, organizować złożone zadania i demonstrować dokładność.

**Ograniczenia/limity:**
- Wymaga co najmniej 2 zadań
- Służy tylko do złożonych, wieloetapowych zadań (3+ kroków)
- Nie należy używać dla trywialnych zadań
- Nie powinno zawierać akcji operacyjnych (testowanie, lintowanie, przeszukiwanie kodu)

**Przykład użycia:**
```
todo_write(
  merge=false,
  todos=[
    {id: "1", content: "Dodać zarządzanie stanem", status: "in_progress"},
    {id: "2", content: "Zaimplementować style", status: "pending"},
    {id: "3", content: "Utworzyć komponent toggle", status: "pending"}
  ]
)
```

---

## 10. search_replace
**Co robi:** Wykonuje dokładne zastąpienia ciągów znaków w plikach. Idealne do refaktoryzacji, zmiany nazw zmiennych i aktualizacji tekstów.

**Ograniczenia/limity:**
- old_string musi być unikalny w pliku (lub użyj replace_all)
- Nie można tworzyć nowych plików (użyj write)
- Musi zachować dokładne wcięcia (tabulatory/spacje)
- Nie dodawać emoji bez prośby użytkownika

**Przykład użycia:**
```
search_replace(
  file_path="banking/types.ts",
  old_string="oldVariableName",
  new_string="newVariableName",
  replace_all=true
)
```

---

## 11. write
**Co robi:** Zapisuje plik do lokalnego systemu plików. Może tworzyć nowe pliki lub nadpisywać istniejące.

**Ograniczenia/limity:**
- Nadpisuje istniejący plik jeśli istnieje pod podaną ścieżką
- Jeśli edytujesz istniejący plik, musisz najpierw użyć read_file
- Zawsze preferuj edycję istniejących plików zamiast tworzenia nowych
- Nigdy nie tworzyć plików dokumentacji (*.md, README) bez jawnego żądania

**Przykład użycia:**
```
write(
  file_path="src/utils/helpers.ts",
  contents="export const formatDate = (date: Date): string => {...}"
)
```

---

## 12. read_file
**Co robi:** Czyta plik z lokalnego systemu plików. Obsługuje zarówno pliki tekstowe jak i obrazy.

**Ograniczenia/limity:**
- Opcjonalnie można określić przesunięcie linii i limit dla dużych plików
- Obsługuje formaty obrazów: jpeg/jpg, png, gif, webp
- Linie są numerowane od 1

**Przykład użycia:**
```
read_file(
  target_file="package.json"
)
```

---

## 13. list_dir
**Co robi:** Wyświetla pliki i katalogi w podanej ścieżce.

**Ograniczenia/limity:**
- Nie wyświetla plików/katalogów zaczynających się od kropki
- Może docelować tylko jeden katalog
- Obsługuje opcjonalne wzorce ignorowania (globs)

**Przykład użycia:**
```
list_dir(
  target_directory="banking/",
  ignore_globs=["*.test.ts"]
)
```

---

## 14. glob_file_search
**Co robi:** Wyszukuje pliki pasujące do wzorca glob. Szybkie narzędzie do znajdowania plików według wzorców nazw.

**Ograniczenia/limity:**
- Działa szybko nawet w dużych bazach kodu
- Zwraca ścieżki posortowane według czasu modyfikacji
- Wzorce bez "**/na początku są automatycznie poprzedzane "**/

**Przykład użycia:**
```
glob_file_search(
  glob_pattern="**/*.test.ts",
  target_directory="banking/"
)
```

---

## 15. list_mcp_resources
**Co robi:** Wyświetla dostępne zasoby z skonfigurowanych serwerów MCP (Model Context Protocol).

**Ograniczenia/limity:**
- Wymaga skonfigurowanych serwerów MCP
- Może opcjonalnie filtrować według identyfikatora serwera

**Przykład użycia:**
```
list_mcp_resources(
  server="docs-server"
)
```

---

## 16. fetch_mcp_resource
**Co robi:** Czyta konkretny zasób z serwera MCP. Może opcjonalnie zapisywać zasób do dysku.

**Ograniczenia/limity:**
- Wymaga identyfikatora serwera i URI zasobu
- Jeśli ustawiono downloadPath, zasób jest zapisywany, a nie zwracany

**Przykład użycia:**
```
fetch_mcp_resource(
  server="docs-server",
  uri="/api/v1/reference",
  downloadPath="docs/api-reference.md"
)
```

---

## 17. mcp_Context7_resolve-library-id
**Co robi:** Rozwiązuje nazwę pakietu/produktu na zgodny z Context7 identyfikator biblioteki. Zwraca listę pasujących bibliotek.

**Ograniczenia/limity:**
- MUSI być wywołany przed get-library-docs (chyba że użytkownik podał ID w formacie '/org/project')
- Zwraca najlepiej pasującą bibliotekę na podstawie nazwy i opisu

**Przykład użycia:**
```
mcp_Context7_resolve-library-id(
  libraryName="lodash"
)
```

---

## 18. mcp_Context7_get-library-docs
**Co robi:** Pobiera aktualną dokumentację dla biblioteki z Context7.

**Ograniczenia/limity:**
- Wymaga identyfikatora biblioteki z resolve-library-id lub w formacie '/org/project'
- Domyślnie pobiera 5000 tokenów dokumentacji
- Może skupić się na konkretnym temacie (np. 'hooks', 'routing')

**Przykład użycia:**
```
mcp_Context7_get-library-docs(
  context7CompatibleLibraryID="/lodash/lodash",
  topic="array methods",
  tokens=3000
)
```

---

## Dodatkowe Uprawnienia

**Czy potrzebuję dodatkowych uprawnień, by uruchomić te narzędzia?**

**NIE** - wszystkie te narzędzia są dostępne w standardowej konfiguracji IDE i mogę je uruchamiać bezpośrednio w ramach tej sesji programistycznej bez żadnych dodatkowych uprawnień.

Jednak niektóre operacje mogą wymagać potwierdzenia użytkownika:
- Polecenia terminala mogą wymagać zatwierdzenia przed wykonaniem
- Destrukcyjne operacje git (force push, hard reset) wymagają jawnej zgody użytkownika
- Tworzenie commitów wymaga jawnego żądania użytkownika

---

## Podsumowanie Kategorii Narzędzi

### 📁 Operacje na Plikach
- read_file, write, delete_file, list_dir, glob_file_search

### 🔍 Wyszukiwanie
- codebase_search, grep, web_search

### ⚙️ Wykonywanie Kodu
- run_terminal_cmd

### 📓 Notebooki
- edit_notebook

### 🔧 Narzędzia Developerskie
- read_lints, todo_write, fetch_rules

### 🔄 Edycja Kodu
- search_replace

### 🌐 Zasoby Zewnętrzne (MCP)
- list_mcp_resources, fetch_mcp_resource, mcp_Context7_resolve-library-id, mcp_Context7_get-library-docs

---

*Dokument wygenerowany: 2025-10-21*

