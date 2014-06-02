Copay Shell
===========

Native application wrapper for [Copay](https://bitpay.github.io/copay)
using [Atom Shell](https://github.com/atom/atom-shell).

![copay-shell](https://cloud.githubusercontent.com/assets/1188875/3153630/ccaacbae-ea9d-11e3-85d6-ac0ec2820ae2.png)

## Setup

Clone the repository and install dependencies.

```
~# git clone https://github.com/gordonwritescode/copay-shell.git
~# cd copay-shell && npm install
```

After dependencies are installed, the Atom Shell binary for your platform will
be fetched and placed in `copay-shell/bin`.

To launch Copay Shell, issue the following command:

```
~# npm start
```

To build a distributable package for your platform, run:

```
~# npm run-script build
```
