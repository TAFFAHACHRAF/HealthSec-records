package healthcare.org.exceptions;

public class HiNotFoundException extends RuntimeException {
    public HiNotFoundException(String message) {
        super(message);
    }
}
