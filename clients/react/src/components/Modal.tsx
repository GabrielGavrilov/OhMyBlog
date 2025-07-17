type Props = {
  header: string;
  confirmationText: string;
  confirmationStyle?: 'confirmation' | 'danger';
  onSubmit: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
};

export default function Modal({
  header,
  confirmationText,
  confirmationStyle = 'confirmation',
  onSubmit,
  onCancel,
  children,
}: Props) {
  return (
    <>
      <div>
        <div
          className="relative z-10"
          aria-labelledby="dialog-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-background px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 sm:text-left">
                      <p
                        className="font-bold text-2xl font-mono"
                        id="dialog-title"
                      >
                        {header}
                      </p>
                      <div className="mt-4">{children}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-background px-4 py-3 flex flex-row-reverse justify-center sm:justify-start sm:px-6">
                  <button
                    className={
                      confirmationStyle === 'danger'
                        ? 'btn btn-warning'
                        : 'btn btn-primary'
                    }
                    onClick={onSubmit}
                  >
                    {confirmationText}
                  </button>
                  <button className="btn" onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
