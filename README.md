# System Przetargów

System Przetargów to aplikacja internetowa umożliwiająca instytucjom ogłaszanie przetargów oraz składanie ofert przez użytkowników. Projekt został stworzony w celu ułatwienia procesu zarządzania przetargami i ofertami.

## Funkcjonalności

- **Logowanie i wylogowywanie**:
  - Użytkownicy mogą logować się do systemu za pomocą nazwy użytkownika i hasła.
  - Obsługa sesji użytkownika.

- **Zarządzanie przetargami**:
  - Wyświetlanie listy aktywnych przetargów.
  - Wyświetlanie listy zakończonych przetargów.
  - Szczegóły przetargu z listą ofert.

- **Składanie ofert**:
  - Użytkownicy mogą składać oferty na aktywne przetargi.
  - Oferty są filtrowane według maksymalnego budżetu przetargu.

- **Dodawanie przetargów**:
  - Instytucje mogą dodawać nowe przetargi z określonym budżetem, czasem rozpoczęcia i zakończenia.

## Technologie

- **Backend**:
  - Node.js
  - Express.js
  - EJS (Embedded JavaScript) jako silnik szablonów

- **Frontend**:
  - Bootstrap 5
  - CSS dla dodatkowego stylowania

- **Baza danych**:
  - MySQL
  - Obsługa za pomocą `mysql2`

## Struktura projektu
project-root/
├── app.js                            # Główna konfiguracja Express.js
├── package.json                      # Plik konfiguracyjny npm
├── .env                              # Dane środowiskowe (np. hasło do bazy)
├── config/
│   └── db.js                         # Konfiguracja połączenia z MySQL
├── controllers/
│   ├── tenderController.js           # Logika związana z przetargami i ofertami
│   └── authController.js             # Logika logowania i wylogowywania
├── models/
│   ├── index.js                      # Inicjalizacja bazy danych i modeli
│   ├── Tender.js                     # Model przetargu
│   ├── Offer.js                      # Model oferty
│   └── User.js                       # Model użytkownika (instytucji)
├── public/
│   ├── css/
│   │   └── styles.css                # Stylowanie (opcjonalnie z Bootstrapem)
│   └── js/
│       └── scripts.js                # JS frontendowy (opcjonalnie)
├── routes/
│   ├── tenderRoutes.js               # Ścieżki przetargowe i ofertowe
│   └── authRoutes.js                 # Ścieżki logowania
├── services/
│   └── tenderService.js              # Logika biznesowa (sortowanie ofert, sprawdzanie terminów)
├── views/
│   ├── partials/
│   │   └── navbar.ejs                # Pasek nawigacji
│   ├── auth/
│   │   └── login.ejs                 # Formularz logowania
│   ├── tenders/
│   │   ├── list.ejs                  # Lista trwających przetargów
│   │   ├── ended.ejs                 # Lista zakończonych przetargów
│   │   ├── details.ejs               # Szczegóły przetargu i lista ofert
│   │   ├── new.ejs                   # Formularz dodania nowego przetargu
│   │   └── offerForm.ejs             # Formularz składania oferty
│   └── index.ejs                     # Strona główna